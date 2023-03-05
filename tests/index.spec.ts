import { describe, expect, expectTypeOf, it } from "vitest";
import { tri, triSync } from "../src";

describe("tri (async)", () => {
    const fn = async (throws = false) => {
        if (throws) {
            throw new Error("error");
        }

        return "result";
    };

    it("errors with function that returns a rejected promise", async () => {
        const [error, impossibleResult] = await tri(() => fn(true));

        expectTypeOf(error).toMatchTypeOf<Error | null>();
        expectTypeOf(impossibleResult).toMatchTypeOf<string | undefined>();

        if (error) {
            expectTypeOf(error).toMatchTypeOf<Error>();
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("error");
            return;
        }

        expectTypeOf(impossibleResult).toMatchTypeOf<string>();
        expect(impossibleResult).toBeUndefined();
    });

    it("succeeds with function that returns a resolved promise", async () => {
        const [impossibleError, result] = await tri(() => fn());

        expectTypeOf(impossibleError).toMatchTypeOf<Error | null>();
        expectTypeOf(result).toMatchTypeOf<string | undefined>();

        if (impossibleError) {
            expectTypeOf(impossibleError).toMatchTypeOf<Error>();
            return;
        }

        expectTypeOf(result).toMatchTypeOf<string>();

        expect(impossibleError).toBeNull();
        expect(result).toBe("result");
    });

    it("errors with rejected promise", async () => {
        const [error, impossibleResult] = await tri(fn(true));

        expectTypeOf(error).toMatchTypeOf<Error | null>();
        expectTypeOf(impossibleResult).toMatchTypeOf<string | undefined>();

        if (error) {
            expectTypeOf(error).toMatchTypeOf<Error>();
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("error");
            return;
        }

        expect(impossibleResult).toBeUndefined();
    });

    it("succeeds with resolved promise", async () => {
        const [impossibleError, result] = await tri(fn());

        expectTypeOf(impossibleError).toMatchTypeOf<Error | null>();
        expectTypeOf(result).toMatchTypeOf<string | undefined>();

        if (impossibleError) {
            expectTypeOf(impossibleError).toMatchTypeOf<Error>();
            return;
        }

        expect(impossibleError).toBeNull();
        expect(result).toBe("result");
    });

    it("type assertion", async () => {
        const [error, result] = await tri<Error, string, number>(fn());

        expectTypeOf(error).toMatchTypeOf<Error | null>();
        expectTypeOf(result).toMatchTypeOf<number | undefined>();

        if (error) {
            expectTypeOf(error).toMatchTypeOf<Error>();
            return;
        }

        expectTypeOf(result).toMatchTypeOf<number>();
        expect(error).toBeNull();
        // be careful with type assertions
        expect(result).toBe("result");
    });
});

describe("tri (sync)", () => {
    const fn = (throws = false) => {
        if (throws) {
            throw new Error("error");
        }

        return "result";
    };

    it("errors with function that returns a rejected promise", () => {
        const [error, impossibleResult] = triSync(() => fn(true));

        expectTypeOf(error).toMatchTypeOf<Error | null>();
        expectTypeOf(impossibleResult).toMatchTypeOf<string | undefined>();

        if (error) {
            expectTypeOf(error).toMatchTypeOf<Error>();
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("error");
            return;
        }

        expectTypeOf(impossibleResult).toMatchTypeOf<string>();
        expect(impossibleResult).toBeUndefined();
    });

    it("succeeds with function that returns a resolved promise", () => {
        const [impossibleError, result] = triSync(() => fn());

        expectTypeOf(impossibleError).toMatchTypeOf<Error | null>();
        expectTypeOf(result).toMatchTypeOf<string | undefined>();

        if (impossibleError) {
            expectTypeOf(impossibleError).toMatchTypeOf<Error>();
            return;
        }

        expectTypeOf(result).toMatchTypeOf<string>();

        expect(impossibleError).toBeNull();
        expect(result).toBe("result");
    });

    it("type assertion", () => {
        const [error, result] = triSync<Error, string, number>(() => fn());

        expectTypeOf(error).toMatchTypeOf<Error | null>();
        expectTypeOf(result).toMatchTypeOf<number | undefined>();

        if (error) {
            expectTypeOf(error).toMatchTypeOf<Error>();
            return;
        }

        expectTypeOf(result).toMatchTypeOf<number>();
        expect(error).toBeNull();
        // be careful with type assertions
        expect(result).toBe("result");
    });
});