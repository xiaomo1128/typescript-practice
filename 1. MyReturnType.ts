const fn =(v:boolean)=>{
    if(v) return 1;
    else return 2;
}

type a =MyReturnType<typeof fn> // should be "1 | 2"

/**
 * 开发的时候用 type，写 SDK、接口 用 interface
 */
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

