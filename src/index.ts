export const tri = async <Err = Error, Input = unknown, Output = Input>(t: Promise<Input> | (() => Input | PromiseLike<Input>)) => {
    try {
        return [null, await (typeof t === "function" ? t() : t)] as [null, Output];
    }
    catch (error) {
        return [error] as [Err];
    }
};

export const triSync = <Err = Error, Input = unknown, Output = Input>(t: () => Input) => {
    try {
        return [null, t()] as [null, unknown] as [null, Output];
    }
    catch (error) {
        return [error] as [Err];
    }
};