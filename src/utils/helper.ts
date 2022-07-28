function getType(source: unknown) {
  return Object.prototype.toString.call(source).slice("[object ".length, -1);
}
function isArray(x: unknown): x is Array<any> {
  return getType(x) === "Array";
}
function isString(x: unknown): x is String {
  return getType(x) === "String";
}
function isNumber(x: unknown): x is Number {
  return getType(x) === "Number";
}
function isFunction(x: unknown): x is Function {
  return getType(x) === "Function";
}
function isBoolean(x: unknown): x is boolean {
  return getType(x) === "Boolean";
}
function isUndef<T = unknown>(x: T): x is T {
  return x === undefined || x === null;
}
function isDef(x: null | undefined) {
  return x !== undefined && x !== null;
}
function notEmpty(x: unknown): x is boolean {
  return [null, undefined, ""].every(i => i !== x);
}
function isObject(x: unknown): x is boolean {
  return getType(x) === "Object";
}
function isEmptyObject<T = unknown>(x: T): x is T {
  let flag = true;
  for (let att in x) {
    // eslint-disable-next-line no-prototype-builtins
    if (isObject(x)) {
      if (x.hasOwnProperty(att)) {
        flag = false;
      }
    }
  }
  return flag;
}
function isNumberPlus(x: any) {
  return /^\d+$/gi.test(x);
}
async function isPromise(x: Promise<any>) {
  return isDef(await x) && isFunction(x.then) && isFunction(x.catch);
}

/* istanbul ignore next function */
function noop() { }
/**
 * set get pathSolve
 * @param path
 */
function pathResolve(path: any) {
  let pathResolve: string[] = [];
  /* istanbul ignore else */
  if (isString(path) || isNumber(path)) {
    pathResolve = String(path).split(".");
  } else if (isArray(path)) {
    if (path.length === 0) return pathResolve;
    const flatPath = path
      .filter((i: any) => isString(i) || isNumber(i))
      .map((i: any) => String(i))
      .reduce((cur: any, next: any) => `${cur}.${next}`);
    pathResolve = flatPath.split(".");
  }
  return pathResolve;
}

/**
 * @param source origin object {}, []
 * @param path [0, 'a', 'b'], 'a.b.c', ['a', 'a.b.c']
 * @param alterValue if path -> value is undefined or null this param will be the final value
 * @param judgeFn self judge like I just want path -> value === 'some value' -> return `alterValue`
 */
function get(
  source: { [x: string]: any; },
  path: any,
  alterValue?: any,
  judgeFn?: (arg0: any) => any // get策略
) {
  if (isUndef(source)) {
    // console.warn(`source data get ${path} is ${source}`);
    return alterValue; // source 无值返回 alterValue
  }
  let pathOut = pathResolve(path).filter((i: string) => !isUndef(i) && i !== "");
  // 如果路径为空 直接return
  if (pathOut.length === 0) {
    if (isUndef(alterValue)) {
      return source;
    } else {
      return alterValue;
    }
  }
  let result: any = {};
  for (let i = 0; i < pathOut.length; i++) {
    const curPath = pathOut[i];
    let out: any = i === 0 ? source[curPath] : result[curPath];

    if (isUndef(out) || (judgeFn && judgeFn(out))) {
      result = alterValue;
      break;
    } else {
      result = out;
    }
  }
  return result;
}

function set(obj: any, path: any, value: any, useType: string) {
  if (isUndef(obj)) {
    return new Error(`undefined null is not allowed`);
  }
  const pathOut = pathResolve(path);
  if (pathOut.length === 0) {
    return obj;
  }
  pathOut.reduce((cur: { [x: string]: any; }, next: string | number, index: number) => {
    const isEnd = index === pathOut.length - 1;
    if (isEnd) {
      return (cur[next] = value);
    }
    if (isUndef(cur[next])) {
      return (cur[next] = useType ? (useType === "array" ? [] : {}) : isNumberPlus(pathOut[index + 1]) ? [] : {});
    } else {
      return cur[next];
    }
  }, obj);
  return obj;
}

function getParam(
  items: string | any[],
  before = (dataArr: any[]) => dataArr.reduce((cur: any, next: any) => ({ ...next, ...cur }), Object.create(null))
) {
  const len = items.length;
  let valid = true;
  const dataResult: any[] = [];
  const falseResolve = (resolve: { (value: unknown): void; (value: unknown): void; (value: unknown): void; (value: unknown): void; (value: unknown): void; (arg0: { valid: boolean; param: {}; }): void; }) => {
    resolve({ valid: false, param: {} });
  };
  const commonBack = (resolve: { (value: unknown): void; (arg0: { valid: boolean; param: any; }): void; }) => {
    resolve({ valid, param: before(dataResult) });
  };
  const isSelfObj = (p: { $$force: boolean; fetch: undefined; }) => {
    return p.$$force === true || p.fetch === undefined;
  };
  const validCalls = (resolve: any, data: any, calls: (arg0: any, arg1: any[]) => any) => {
    return new Promise(async res => {
      const result = calls(data, dataResult);
      if (await isPromise(result)) {
        result
          .then((val: boolean) => res((valid = val)))
          .catch((error: any) => {
            console.error(error);
            falseResolve(resolve);
          });
      } else {
        res((valid = result));
      }
    });
  };
  return new Promise(resolve => {
    const next = (step: number) => {
      const cur = items[step];
      if (step === len) {
        commonBack(resolve);
      }
      if (!isUndef(cur)) {
        let calls = (_: any) => true;
        let async = false;
        let fetch;
        if (isFunction(cur)) {
          fetch = cur;
        } else {
          if (isSelfObj(cur)) {
            const { $$force, ...rest }: any = cur;
            fetch = rest;
          } else {
            ({ fetch, async = async, calls = calls } = cur);
          }
        }
        // null undefined 直接return
        if (isUndef(fetch)) {
          falseResolve(resolve);
        }
        const invokeCalls = (resolve: { (value: unknown): void; (value: unknown): void; (value: unknown): void; }, data: any, calls: { (_: any): boolean; (_: any): boolean; (_: any): boolean; }) => {
          validCalls(resolve, data, calls).then(valid => {
            if (valid) {
              next(step + 1);
            } else {
              commonBack(resolve);
            }
          });
        };
        // 异步获取数据
        if (async && isFunction(fetch)) {
          fetch()
            .then((data: any) => {
              dataResult.push(data);
              invokeCalls(resolve, data, calls);
            })
            .catch((error: any) => {
              console.error(error);
              falseResolve(resolve);
            });
          // function
        } else if (isFunction(fetch) && !async) {
          try {
            const data = fetch();
            dataResult.push(data);
            invokeCalls(resolve, data, calls);
          } catch (error) {
            console.error(error);
            falseResolve(resolve);
          }
          // Object
        } else if (isObject(fetch)) {
          dataResult.push(fetch);
          invokeCalls(resolve, fetch, calls);
        } else {
          falseResolve(resolve);
        }
      } else {
        falseResolve(resolve);
      }
    };
    next(0);
  });
}

function setColor(color: string) {
  if (!color && typeof color !== "string") return;
  return color.split(",").map((item: any, index: number) => {
    return index < 3 ? Number(item) / 255 : item;
  });
}
function traverseObj(obj: { [x: string]: any; }, callBack = (_: any, name: string) => _) {
  Object.keys(obj).forEach(name => {
    callBack(obj[name], name);
  });
}

export {
  get,
  getParam,
  getType,
  isArray,
  isDef,
  isEmptyObject,
  isFunction,
  isNumber,
  isNumberPlus,
  isObject,
  isPromise,
  isString,
  isUndef,
  noop,
  notEmpty,
  pathResolve,
  set,
  isBoolean,
  traverseObj,
  setColor,
};
