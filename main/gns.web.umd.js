(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.gns = global.gns || {}, global.gns.web = factory()));
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    var isMergeableObject = function isMergeableObject(value) {
    	return isNonNullObject(value)
    		&& !isSpecial(value)
    };

    function isNonNullObject(value) {
    	return !!value && typeof value === 'object'
    }

    function isSpecial(value) {
    	var stringValue = Object.prototype.toString.call(value);

    	return stringValue === '[object RegExp]'
    		|| stringValue === '[object Date]'
    		|| isReactElement(value)
    }

    // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
    var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
    var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

    function isReactElement(value) {
    	return value.$$typeof === REACT_ELEMENT_TYPE
    }

    function emptyTarget(val) {
    	return Array.isArray(val) ? [] : {}
    }

    function cloneUnlessOtherwiseSpecified(value, options) {
    	return (options.clone !== false && options.isMergeableObject(value))
    		? deepmerge(emptyTarget(value), value, options)
    		: value
    }

    function defaultArrayMerge(target, source, options) {
    	return target.concat(source).map(function(element) {
    		return cloneUnlessOtherwiseSpecified(element, options)
    	})
    }

    function getMergeFunction(key, options) {
    	if (!options.customMerge) {
    		return deepmerge
    	}
    	var customMerge = options.customMerge(key);
    	return typeof customMerge === 'function' ? customMerge : deepmerge
    }

    function getEnumerableOwnPropertySymbols(target) {
    	return Object.getOwnPropertySymbols
    		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
    			return target.propertyIsEnumerable(symbol)
    		})
    		: []
    }

    function getKeys(target) {
    	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
    }

    function propertyIsOnObject(object, property) {
    	try {
    		return property in object
    	} catch(_) {
    		return false
    	}
    }

    // Protects from prototype poisoning and unexpected merging up the prototype chain.
    function propertyIsUnsafe(target, key) {
    	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
    		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
    			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
    }

    function mergeObject(target, source, options) {
    	var destination = {};
    	if (options.isMergeableObject(target)) {
    		getKeys(target).forEach(function(key) {
    			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
    		});
    	}
    	getKeys(source).forEach(function(key) {
    		if (propertyIsUnsafe(target, key)) {
    			return
    		}

    		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
    			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
    		} else {
    			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
    		}
    	});
    	return destination
    }

    function deepmerge(target, source, options) {
    	options = options || {};
    	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
    	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
    	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
    	// implementations can use it. The caller may not replace it.
    	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

    	var sourceIsArray = Array.isArray(source);
    	var targetIsArray = Array.isArray(target);
    	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

    	if (!sourceAndTargetTypesMatch) {
    		return cloneUnlessOtherwiseSpecified(source, options)
    	} else if (sourceIsArray) {
    		return options.arrayMerge(target, source, options)
    	} else {
    		return mergeObject(target, source, options)
    	}
    }

    deepmerge.all = function deepmergeAll(array, options) {
    	if (!Array.isArray(array)) {
    		throw new Error('first argument should be an array')
    	}

    	return array.reduce(function(prev, next) {
    		return deepmerge(prev, next, options)
    	}, {})
    };

    var deepmerge_1 = deepmerge;

    var cjs = deepmerge_1;

    const defaultConfig = {
        providers: [],
        showToasts: true,
        showToastActions: true,
        autoRequestPermission: true
    };
    const gnsActionCommandTypes = {
        snooze: "snooze"
    };
    const gnsActionCommand = "T42.GNS.ActionCommand";
    const gnsNotificationsStreamName = "T42.GNS.Notifications";
    const gnsGetNotificationsStreamName = "T42.GNS.GetNotifications";
    const gnsControlMethodName = "T42.GNS.Control";
    const stompProviderConnectionTimeoutMS = 60000;
    const defaultFakeNotificationsStore = [
        {
            id: "63733fe3-1bcb-4327-a9c1-78bd8edb4f1b",
            type: "string",
            source: "demo-application",
            creationTime: 1629104858798,
            recipient: "U000001",
            correlationId: "string",
            title: "string",
            description: "string",
            cancelMode: "SEPARATE",
            severity: "MEDIUM",
            retries: [
                {
                    times: 5,
                    schedule: "0 * * * * ? *"
                }
            ],
            actions: [
                {
                    type: "view-in-app",
                    caption: "View In App",
                    execution: {
                        type: "visit_uri",
                        uri: "http://localhost:8080/viewInApp?subject=string&action=view-in-app"
                    }
                },
                {
                    type: "my-api-call",
                    caption: "REST Call",
                    execution: {
                        type: "rest_call",
                        method: "POST",
                        uri: "http://localhost:8080/postCall",
                        body: "{\"arg\":\"An Argument\"}",
                        headers: {
                            Accept: [
                                "application/json"
                            ]
                        }
                    }
                }
            ]
        },
        {
            id: "45633fe3-1bcb-4327-a9c1-78bd8edb4f1b",
            type: "string",
            source: "demo-application",
            creationTime: 1629104875751,
            recipient: "U000001",
            correlationId: "string",
            title: "string",
            description: "string",
            cancelMode: "SEPARATE",
            severity: "MEDIUM",
            retries: [
                {
                    times: 5,
                    schedule: "0 * * * * ? *"
                }
            ],
            actions: [
                {
                    type: "view-in-app",
                    caption: "View In App",
                    execution: {
                        type: "visit_uri",
                        uri: "http://localhost:8080/viewInApp?subject=string&action=view-in-app"
                    }
                },
                {
                    type: "my-api-call",
                    caption: "REST Call",
                    execution: {
                        type: "rest_call",
                        method: "POST",
                        uri: "http://localhost:8080/postCall",
                        body: "{\"arg\":\"An Argument\"}",
                        headers: {
                            Accept: [
                                "application/json"
                            ]
                        }
                    }
                }
            ]
        }
    ];
    const providerMessageTypes = {
        snapshotEnd: "snapshot-end"
    };

    /**
     * Wraps values in an `Ok` type.
     *
     * Example: `ok(5) // => {ok: true, result: 5}`
     */
    var ok = function (result) { return ({ ok: true, result: result }); };
    /**
     * Typeguard for `Ok`.
     */
    var isOk = function (r) { return r.ok === true; };
    /**
     * Wraps errors in an `Err` type.
     *
     * Example: `err('on fire') // => {ok: false, error: 'on fire'}`
     */
    var err = function (error) { return ({ ok: false, error: error }); };
    /**
     * Typeguard for `Err`.
     */
    var isErr = function (r) { return r.ok === false; };
    /**
     * Create a `Promise` that either resolves with the result of `Ok` or rejects
     * with the error of `Err`.
     */
    var asPromise = function (r) {
        return r.ok === true ? Promise.resolve(r.result) : Promise.reject(r.error);
    };
    /**
     * Unwraps a `Result` and returns either the result of an `Ok`, or
     * `defaultValue`.
     *
     * Example:
     * ```
     * Result.withDefault(5, number().run(json))
     * ```
     *
     * It would be nice if `Decoder` had an instance method that mirrored this
     * function. Such a method would look something like this:
     * ```
     * class Decoder<A> {
     *   runWithDefault = (defaultValue: A, json: any): A =>
     *     Result.withDefault(defaultValue, this.run(json));
     * }
     *
     * number().runWithDefault(5, json)
     * ```
     * Unfortunately, the type of `defaultValue: A` on the method causes issues
     * with type inference on  the `object` decoder in some situations. While these
     * inference issues can be solved by providing the optional type argument for
     * `object`s, the extra trouble and confusion doesn't seem worth it.
     */
    var withDefault = function (defaultValue, r) {
        return r.ok === true ? r.result : defaultValue;
    };
    /**
     * Return the successful result, or throw an error.
     */
    var withException = function (r) {
        if (r.ok === true) {
            return r.result;
        }
        else {
            throw r.error;
        }
    };
    /**
     * Given an array of `Result`s, return the successful values.
     */
    var successes = function (results) {
        return results.reduce(function (acc, r) { return (r.ok === true ? acc.concat(r.result) : acc); }, []);
    };
    /**
     * Apply `f` to the result of an `Ok`, or pass the error through.
     */
    var map = function (f, r) {
        return r.ok === true ? ok(f(r.result)) : r;
    };
    /**
     * Apply `f` to the result of two `Ok`s, or pass an error through. If both
     * `Result`s are errors then the first one is returned.
     */
    var map2 = function (f, ar, br) {
        return ar.ok === false ? ar :
            br.ok === false ? br :
                ok(f(ar.result, br.result));
    };
    /**
     * Apply `f` to the error of an `Err`, or pass the success through.
     */
    var mapError = function (f, r) {
        return r.ok === true ? r : err(f(r.error));
    };
    /**
     * Chain together a sequence of computations that may fail, similar to a
     * `Promise`. If the first computation fails then the error will propagate
     * through. If it succeeds, then `f` will be applied to the value, returning a
     * new `Result`.
     */
    var andThen = function (f, r) {
        return r.ok === true ? f(r.result) : r;
    };


    Object.freeze({
    	ok: ok,
    	isOk: isOk,
    	err: err,
    	isErr: isErr,
    	asPromise: asPromise,
    	withDefault: withDefault,
    	withException: withException,
    	successes: successes,
    	map: map,
    	map2: map2,
    	mapError: mapError,
    	andThen: andThen
    });

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */



    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function isEqual(a, b) {
        if (a === b) {
            return true;
        }
        if (a === null && b === null) {
            return true;
        }
        if (typeof (a) !== typeof (b)) {
            return false;
        }
        if (typeof (a) === 'object') {
            // Array
            if (Array.isArray(a)) {
                if (!Array.isArray(b)) {
                    return false;
                }
                if (a.length !== b.length) {
                    return false;
                }
                for (var i = 0; i < a.length; i++) {
                    if (!isEqual(a[i], b[i])) {
                        return false;
                    }
                }
                return true;
            }
            // Hash table
            var keys = Object.keys(a);
            if (keys.length !== Object.keys(b).length) {
                return false;
            }
            for (var i = 0; i < keys.length; i++) {
                if (!b.hasOwnProperty(keys[i])) {
                    return false;
                }
                if (!isEqual(a[keys[i]], b[keys[i]])) {
                    return false;
                }
            }
            return true;
        }
    }
    /*
     * Helpers
     */
    var isJsonArray = function (json) { return Array.isArray(json); };
    var isJsonObject = function (json) {
        return typeof json === 'object' && json !== null && !isJsonArray(json);
    };
    var typeString = function (json) {
        switch (typeof json) {
            case 'string':
                return 'a string';
            case 'number':
                return 'a number';
            case 'boolean':
                return 'a boolean';
            case 'undefined':
                return 'undefined';
            case 'object':
                if (json instanceof Array) {
                    return 'an array';
                }
                else if (json === null) {
                    return 'null';
                }
                else {
                    return 'an object';
                }
            default:
                return JSON.stringify(json);
        }
    };
    var expectedGot = function (expected, got) {
        return "expected " + expected + ", got " + typeString(got);
    };
    var printPath = function (paths) {
        return paths.map(function (path) { return (typeof path === 'string' ? "." + path : "[" + path + "]"); }).join('');
    };
    var prependAt = function (newAt, _a) {
        var at = _a.at, rest = __rest(_a, ["at"]);
        return (__assign({ at: newAt + (at || '') }, rest));
    };
    /**
     * Decoders transform json objects with unknown structure into known and
     * verified forms. You can create objects of type `Decoder<A>` with either the
     * primitive decoder functions, such as `boolean()` and `string()`, or by
     * applying higher-order decoders to the primitives, such as `array(boolean())`
     * or `dict(string())`.
     *
     * Each of the decoder functions are available both as a static method on
     * `Decoder` and as a function alias -- for example the string decoder is
     * defined at `Decoder.string()`, but is also aliased to `string()`. Using the
     * function aliases exported with the library is recommended.
     *
     * `Decoder` exposes a number of 'run' methods, which all decode json in the
     * same way, but communicate success and failure in different ways. The `map`
     * and `andThen` methods modify decoders without having to call a 'run' method.
     *
     * Alternatively, the main decoder `run()` method returns an object of type
     * `Result<A, DecoderError>`. This library provides a number of helper
     * functions for dealing with the `Result` type, so you can do all the same
     * things with a `Result` as with the decoder methods.
     */
    var Decoder = /** @class */ (function () {
        /**
         * The Decoder class constructor is kept private to separate the internal
         * `decode` function from the external `run` function. The distinction
         * between the two functions is that `decode` returns a
         * `Partial<DecoderError>` on failure, which contains an unfinished error
         * report. When `run` is called on a decoder, the relevant series of `decode`
         * calls is made, and then on failure the resulting `Partial<DecoderError>`
         * is turned into a `DecoderError` by filling in the missing information.
         *
         * While hiding the constructor may seem restrictive, leveraging the
         * provided decoder combinators and helper functions such as
         * `andThen` and `map` should be enough to build specialized decoders as
         * needed.
         */
        function Decoder(decode) {
            var _this = this;
            this.decode = decode;
            /**
             * Run the decoder and return a `Result` with either the decoded value or a
             * `DecoderError` containing the json input, the location of the error, and
             * the error message.
             *
             * Examples:
             * ```
             * number().run(12)
             * // => {ok: true, result: 12}
             *
             * string().run(9001)
             * // =>
             * // {
             * //   ok: false,
             * //   error: {
             * //     kind: 'DecoderError',
             * //     input: 9001,
             * //     at: 'input',
             * //     message: 'expected a string, got 9001'
             * //   }
             * // }
             * ```
             */
            this.run = function (json) {
                return mapError(function (error) { return ({
                    kind: 'DecoderError',
                    input: json,
                    at: 'input' + (error.at || ''),
                    message: error.message || ''
                }); }, _this.decode(json));
            };
            /**
             * Run the decoder as a `Promise`.
             */
            this.runPromise = function (json) { return asPromise(_this.run(json)); };
            /**
             * Run the decoder and return the value on success, or throw an exception
             * with a formatted error string.
             */
            this.runWithException = function (json) { return withException(_this.run(json)); };
            /**
             * Construct a new decoder that applies a transformation to the decoded
             * result. If the decoder succeeds then `f` will be applied to the value. If
             * it fails the error will propagated through.
             *
             * Example:
             * ```
             * number().map(x => x * 5).run(10)
             * // => {ok: true, result: 50}
             * ```
             */
            this.map = function (f) {
                return new Decoder(function (json) { return map(f, _this.decode(json)); });
            };
            /**
             * Chain together a sequence of decoders. The first decoder will run, and
             * then the function will determine what decoder to run second. If the result
             * of the first decoder succeeds then `f` will be applied to the decoded
             * value. If it fails the error will propagate through.
             *
             * This is a very powerful method -- it can act as both the `map` and `where`
             * methods, can improve error messages for edge cases, and can be used to
             * make a decoder for custom types.
             *
             * Example of adding an error message:
             * ```
             * const versionDecoder = valueAt(['version'], number());
             * const infoDecoder3 = object({a: boolean()});
             *
             * const decoder = versionDecoder.andThen(version => {
             *   switch (version) {
             *     case 3:
             *       return infoDecoder3;
             *     default:
             *       return fail(`Unable to decode info, version ${version} is not supported.`);
             *   }
             * });
             *
             * decoder.run({version: 3, a: true})
             * // => {ok: true, result: {a: true}}
             *
             * decoder.run({version: 5, x: 'abc'})
             * // =>
             * // {
             * //   ok: false,
             * //   error: {... message: 'Unable to decode info, version 5 is not supported.'}
             * // }
             * ```
             *
             * Example of decoding a custom type:
             * ```
             * // nominal type for arrays with a length of at least one
             * type NonEmptyArray<T> = T[] & { __nonEmptyArrayBrand__: void };
             *
             * const nonEmptyArrayDecoder = <T>(values: Decoder<T>): Decoder<NonEmptyArray<T>> =>
             *   array(values).andThen(arr =>
             *     arr.length > 0
             *       ? succeed(createNonEmptyArray(arr))
             *       : fail(`expected a non-empty array, got an empty array`)
             *   );
             * ```
             */
            this.andThen = function (f) {
                return new Decoder(function (json) {
                    return andThen(function (value) { return f(value).decode(json); }, _this.decode(json));
                });
            };
            /**
             * Add constraints to a decoder _without_ changing the resulting type. The
             * `test` argument is a predicate function which returns true for valid
             * inputs. When `test` fails on an input, the decoder fails with the given
             * `errorMessage`.
             *
             * ```
             * const chars = (length: number): Decoder<string> =>
             *   string().where(
             *     (s: string) => s.length === length,
             *     `expected a string of length ${length}`
             *   );
             *
             * chars(5).run('12345')
             * // => {ok: true, result: '12345'}
             *
             * chars(2).run('HELLO')
             * // => {ok: false, error: {... message: 'expected a string of length 2'}}
             *
             * chars(12).run(true)
             * // => {ok: false, error: {... message: 'expected a string, got a boolean'}}
             * ```
             */
            this.where = function (test, errorMessage) {
                return _this.andThen(function (value) { return (test(value) ? Decoder.succeed(value) : Decoder.fail(errorMessage)); });
            };
        }
        /**
         * Decoder primitive that validates strings, and fails on all other input.
         */
        Decoder.string = function () {
            return new Decoder(function (json) {
                return typeof json === 'string'
                    ? ok(json)
                    : err({ message: expectedGot('a string', json) });
            });
        };
        /**
         * Decoder primitive that validates numbers, and fails on all other input.
         */
        Decoder.number = function () {
            return new Decoder(function (json) {
                return typeof json === 'number'
                    ? ok(json)
                    : err({ message: expectedGot('a number', json) });
            });
        };
        /**
         * Decoder primitive that validates booleans, and fails on all other input.
         */
        Decoder.boolean = function () {
            return new Decoder(function (json) {
                return typeof json === 'boolean'
                    ? ok(json)
                    : err({ message: expectedGot('a boolean', json) });
            });
        };
        Decoder.constant = function (value) {
            return new Decoder(function (json) {
                return isEqual(json, value)
                    ? ok(value)
                    : err({ message: "expected " + JSON.stringify(value) + ", got " + JSON.stringify(json) });
            });
        };
        Decoder.object = function (decoders) {
            return new Decoder(function (json) {
                if (isJsonObject(json) && decoders) {
                    var obj = {};
                    for (var key in decoders) {
                        if (decoders.hasOwnProperty(key)) {
                            var r = decoders[key].decode(json[key]);
                            if (r.ok === true) {
                                // tslint:disable-next-line:strict-type-predicates
                                if (r.result !== undefined) {
                                    obj[key] = r.result;
                                }
                            }
                            else if (json[key] === undefined) {
                                return err({ message: "the key '" + key + "' is required but was not present" });
                            }
                            else {
                                return err(prependAt("." + key, r.error));
                            }
                        }
                    }
                    return ok(obj);
                }
                else if (isJsonObject(json)) {
                    return ok(json);
                }
                else {
                    return err({ message: expectedGot('an object', json) });
                }
            });
        };
        Decoder.array = function (decoder) {
            return new Decoder(function (json) {
                if (isJsonArray(json) && decoder) {
                    var decodeValue_1 = function (v, i) {
                        return mapError(function (err$$1) { return prependAt("[" + i + "]", err$$1); }, decoder.decode(v));
                    };
                    return json.reduce(function (acc, v, i) {
                        return map2(function (arr, result) { return arr.concat([result]); }, acc, decodeValue_1(v, i));
                    }, ok([]));
                }
                else if (isJsonArray(json)) {
                    return ok(json);
                }
                else {
                    return err({ message: expectedGot('an array', json) });
                }
            });
        };
        Decoder.tuple = function (decoders) {
            return new Decoder(function (json) {
                if (isJsonArray(json)) {
                    if (json.length !== decoders.length) {
                        return err({
                            message: "expected a tuple of length " + decoders.length + ", got one of length " + json.length
                        });
                    }
                    var result = [];
                    for (var i = 0; i < decoders.length; i++) {
                        var nth = decoders[i].decode(json[i]);
                        if (nth.ok) {
                            result[i] = nth.result;
                        }
                        else {
                            return err(prependAt("[" + i + "]", nth.error));
                        }
                    }
                    return ok(result);
                }
                else {
                    return err({ message: expectedGot("a tuple of length " + decoders.length, json) });
                }
            });
        };
        Decoder.union = function (ad, bd) {
            var decoders = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                decoders[_i - 2] = arguments[_i];
            }
            return Decoder.oneOf.apply(Decoder, [ad, bd].concat(decoders));
        };
        Decoder.intersection = function (ad, bd) {
            var ds = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                ds[_i - 2] = arguments[_i];
            }
            return new Decoder(function (json) {
                return [ad, bd].concat(ds).reduce(function (acc, decoder) { return map2(Object.assign, acc, decoder.decode(json)); }, ok({}));
            });
        };
        /**
         * Escape hatch to bypass validation. Always succeeds and types the result as
         * `any`. Useful for defining decoders incrementally, particularly for
         * complex objects.
         *
         * Example:
         * ```
         * interface User {
         *   name: string;
         *   complexUserData: ComplexType;
         * }
         *
         * const userDecoder: Decoder<User> = object({
         *   name: string(),
         *   complexUserData: anyJson()
         * });
         * ```
         */
        Decoder.anyJson = function () { return new Decoder(function (json) { return ok(json); }); };
        /**
         * Decoder identity function which always succeeds and types the result as
         * `unknown`.
         */
        Decoder.unknownJson = function () {
            return new Decoder(function (json) { return ok(json); });
        };
        /**
         * Decoder for json objects where the keys are unknown strings, but the values
         * should all be of the same type.
         *
         * Example:
         * ```
         * dict(number()).run({chocolate: 12, vanilla: 10, mint: 37});
         * // => {ok: true, result: {chocolate: 12, vanilla: 10, mint: 37}}
         * ```
         */
        Decoder.dict = function (decoder) {
            return new Decoder(function (json) {
                if (isJsonObject(json)) {
                    var obj = {};
                    for (var key in json) {
                        if (json.hasOwnProperty(key)) {
                            var r = decoder.decode(json[key]);
                            if (r.ok === true) {
                                obj[key] = r.result;
                            }
                            else {
                                return err(prependAt("." + key, r.error));
                            }
                        }
                    }
                    return ok(obj);
                }
                else {
                    return err({ message: expectedGot('an object', json) });
                }
            });
        };
        /**
         * Decoder for values that may be `undefined`. This is primarily helpful for
         * decoding interfaces with optional fields.
         *
         * Example:
         * ```
         * interface User {
         *   id: number;
         *   isOwner?: boolean;
         * }
         *
         * const decoder: Decoder<User> = object({
         *   id: number(),
         *   isOwner: optional(boolean())
         * });
         * ```
         */
        Decoder.optional = function (decoder) {
            return new Decoder(function (json) { return (json === undefined || json === null ? ok(undefined) : decoder.decode(json)); });
        };
        /**
         * Decoder that attempts to run each decoder in `decoders` and either succeeds
         * with the first successful decoder, or fails after all decoders have failed.
         *
         * Note that `oneOf` expects the decoders to all have the same return type,
         * while `union` creates a decoder for the union type of all the input
         * decoders.
         *
         * Examples:
         * ```
         * oneOf(string(), number().map(String))
         * oneOf(constant('start'), constant('stop'), succeed('unknown'))
         * ```
         */
        Decoder.oneOf = function () {
            var decoders = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                decoders[_i] = arguments[_i];
            }
            return new Decoder(function (json) {
                var errors = [];
                for (var i = 0; i < decoders.length; i++) {
                    var r = decoders[i].decode(json);
                    if (r.ok === true) {
                        return r;
                    }
                    else {
                        errors[i] = r.error;
                    }
                }
                var errorsList = errors
                    .map(function (error) { return "at error" + (error.at || '') + ": " + error.message; })
                    .join('", "');
                return err({
                    message: "expected a value matching one of the decoders, got the errors [\"" + errorsList + "\"]"
                });
            });
        };
        /**
         * Decoder that always succeeds with either the decoded value, or a fallback
         * default value.
         */
        Decoder.withDefault = function (defaultValue, decoder) {
            return new Decoder(function (json) {
                return ok(withDefault(defaultValue, decoder.decode(json)));
            });
        };
        /**
         * Decoder that pulls a specific field out of a json structure, instead of
         * decoding and returning the full structure. The `paths` array describes the
         * object keys and array indices to traverse, so that values can be pulled out
         * of a nested structure.
         *
         * Example:
         * ```
         * const decoder = valueAt(['a', 'b', 0], string());
         *
         * decoder.run({a: {b: ['surprise!']}})
         * // => {ok: true, result: 'surprise!'}
         *
         * decoder.run({a: {x: 'cats'}})
         * // => {ok: false, error: {... at: 'input.a.b[0]' message: 'path does not exist'}}
         * ```
         *
         * Note that the `decoder` is ran on the value found at the last key in the
         * path, even if the last key is not found. This allows the `optional`
         * decoder to succeed when appropriate.
         * ```
         * const optionalDecoder = valueAt(['a', 'b', 'c'], optional(string()));
         *
         * optionalDecoder.run({a: {b: {c: 'surprise!'}}})
         * // => {ok: true, result: 'surprise!'}
         *
         * optionalDecoder.run({a: {b: 'cats'}})
         * // => {ok: false, error: {... at: 'input.a.b.c' message: 'expected an object, got "cats"'}
         *
         * optionalDecoder.run({a: {b: {z: 1}}})
         * // => {ok: true, result: undefined}
         * ```
         */
        Decoder.valueAt = function (paths, decoder) {
            return new Decoder(function (json) {
                var jsonAtPath = json;
                for (var i = 0; i < paths.length; i++) {
                    if (jsonAtPath === undefined) {
                        return err({
                            at: printPath(paths.slice(0, i + 1)),
                            message: 'path does not exist'
                        });
                    }
                    else if (typeof paths[i] === 'string' && !isJsonObject(jsonAtPath)) {
                        return err({
                            at: printPath(paths.slice(0, i + 1)),
                            message: expectedGot('an object', jsonAtPath)
                        });
                    }
                    else if (typeof paths[i] === 'number' && !isJsonArray(jsonAtPath)) {
                        return err({
                            at: printPath(paths.slice(0, i + 1)),
                            message: expectedGot('an array', jsonAtPath)
                        });
                    }
                    else {
                        jsonAtPath = jsonAtPath[paths[i]];
                    }
                }
                return mapError(function (error) {
                    return jsonAtPath === undefined
                        ? { at: printPath(paths), message: 'path does not exist' }
                        : prependAt(printPath(paths), error);
                }, decoder.decode(jsonAtPath));
            });
        };
        /**
         * Decoder that ignores the input json and always succeeds with `fixedValue`.
         */
        Decoder.succeed = function (fixedValue) {
            return new Decoder(function (json) { return ok(fixedValue); });
        };
        /**
         * Decoder that ignores the input json and always fails with `errorMessage`.
         */
        Decoder.fail = function (errorMessage) {
            return new Decoder(function (json) { return err({ message: errorMessage }); });
        };
        /**
         * Decoder that allows for validating recursive data structures. Unlike with
         * functions, decoders assigned to variables can't reference themselves
         * before they are fully defined. We can avoid prematurely referencing the
         * decoder by wrapping it in a function that won't be called until use, at
         * which point the decoder has been defined.
         *
         * Example:
         * ```
         * interface Comment {
         *   msg: string;
         *   replies: Comment[];
         * }
         *
         * const decoder: Decoder<Comment> = object({
         *   msg: string(),
         *   replies: lazy(() => array(decoder))
         * });
         * ```
         */
        Decoder.lazy = function (mkDecoder) {
            return new Decoder(function (json) { return mkDecoder().decode(json); });
        };
        return Decoder;
    }());

    /* tslint:disable:variable-name */
    /** See `Decoder.string` */
    var string = Decoder.string;
    /** See `Decoder.number` */
    var number = Decoder.number;
    /** See `Decoder.boolean` */
    var boolean = Decoder.boolean;
    /** See `Decoder.anyJson` */
    var anyJson = Decoder.anyJson;
    /** See `Decoder.constant` */
    var constant = Decoder.constant;
    /** See `Decoder.object` */
    var object = Decoder.object;
    /** See `Decoder.array` */
    var array = Decoder.array;
    /** See `Decoder.optional` */
    var optional = Decoder.optional;
    /** See `Decoder.oneOf` */
    var oneOf = Decoder.oneOf;
    /** See `Decoder.fail` */
    var fail = Decoder.fail;

    const functionCheck = (input, propDescription) => {
        const providedType = typeof input;
        return providedType === "function" ?
            anyJson() :
            fail(`The provided argument as ${propDescription} should be of type function, provided: ${typeof providedType}`);
    };
    const nonNegativeNumberDecoder = number().where((num) => num >= 0, "Expected a non-negative number");
    const nonEmptyStringDecoder = string().where((s) => s.length > 0, "Expected a non-empty string");
    anyJson();
    const controlTypesDecoder = oneOf(constant("snooze"));
    const snoozeConfigDecoder = object({
        id: nonEmptyStringDecoder,
        until: optional(nonNegativeNumberDecoder)
    });
    const snapshotRequestConfigDecoder = object({
        limit: nonNegativeNumberDecoder,
        since: optional(nonNegativeNumberDecoder)
    });
    const stompProviderConfigDecoder = object({
        type: constant("stomp"),
        url: nonEmptyStringDecoder,
        recipient: optional(nonEmptyStringDecoder),
        authorization: optional(anyJson().andThen((result) => functionCheck(result, "authorization"))),
        useFakeStore: optional(boolean()),
        fakeStore: optional(array(anyJson())),
        connectionTimeoutMS: optional(nonNegativeNumberDecoder)
    });
    const gnsWebConfigDecoder = object({
        providers: array(stompProviderConfigDecoder),
        showToasts: optional(boolean()),
        showToastActions: optional(boolean()),
        autoRequestPermission: optional(boolean()),
        formatNotificationBody: optional(anyJson().andThen((result) => functionCheck(result, "formatNotificationBody"))),
        focusPlatformOnDefaultClick: optional(anyJson().andThen((result) => functionCheck(result, "focusPlatformOnDefaultClick")))
    });

    var global$1 = (typeof global !== "undefined" ? global :
                typeof self !== "undefined" ? self :
                typeof window !== "undefined" ? window : {});

    /* sockjs-client v1.5.1 | http://sockjs.org | MIT license */
    (function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f();}else if(typeof define==="function"&&define.amd){define([],f);}else {var g;if(typeof window!=="undefined"){g=window;}else if(typeof global$1!=="undefined"){g=global$1;}else if(typeof self!=="undefined"){g=self;}else {g=this;}g.SockJS = f();}})(function(){var define;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t);}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
    (function (global){

    var transportList = require('./transport-list');

    module.exports = require('./main')(transportList);

    // TODO can't get rid of this until all servers do
    if ('_sockjs_onload' in global) {
      setTimeout(global._sockjs_onload, 1);
    }

    }).call(this,typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

    },{"./main":14,"./transport-list":16}],2:[function(require,module,exports){

    var inherits = require('inherits')
      , Event = require('./event')
      ;

    function CloseEvent() {
      Event.call(this);
      this.initEvent('close', false, false);
      this.wasClean = false;
      this.code = 0;
      this.reason = '';
    }

    inherits(CloseEvent, Event);

    module.exports = CloseEvent;

    },{"./event":4,"inherits":57}],3:[function(require,module,exports){

    var inherits = require('inherits')
      , EventTarget = require('./eventtarget')
      ;

    function EventEmitter() {
      EventTarget.call(this);
    }

    inherits(EventEmitter, EventTarget);

    EventEmitter.prototype.removeAllListeners = function(type) {
      if (type) {
        delete this._listeners[type];
      } else {
        this._listeners = {};
      }
    };

    EventEmitter.prototype.once = function(type, listener) {
      var self = this
        , fired = false;

      function g() {
        self.removeListener(type, g);

        if (!fired) {
          fired = true;
          listener.apply(this, arguments);
        }
      }

      this.on(type, g);
    };

    EventEmitter.prototype.emit = function() {
      var type = arguments[0];
      var listeners = this._listeners[type];
      if (!listeners) {
        return;
      }
      // equivalent of Array.prototype.slice.call(arguments, 1);
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var ai = 1; ai < l; ai++) {
        args[ai - 1] = arguments[ai];
      }
      for (var i = 0; i < listeners.length; i++) {
        listeners[i].apply(this, args);
      }
    };

    EventEmitter.prototype.on = EventEmitter.prototype.addListener = EventTarget.prototype.addEventListener;
    EventEmitter.prototype.removeListener = EventTarget.prototype.removeEventListener;

    module.exports.EventEmitter = EventEmitter;

    },{"./eventtarget":5,"inherits":57}],4:[function(require,module,exports){

    function Event(eventType) {
      this.type = eventType;
    }

    Event.prototype.initEvent = function(eventType, canBubble, cancelable) {
      this.type = eventType;
      this.bubbles = canBubble;
      this.cancelable = cancelable;
      this.timeStamp = +new Date();
      return this;
    };

    Event.prototype.stopPropagation = function() {};
    Event.prototype.preventDefault = function() {};

    Event.CAPTURING_PHASE = 1;
    Event.AT_TARGET = 2;
    Event.BUBBLING_PHASE = 3;

    module.exports = Event;

    },{}],5:[function(require,module,exports){

    /* Simplified implementation of DOM2 EventTarget.
     *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
     */

    function EventTarget() {
      this._listeners = {};
    }

    EventTarget.prototype.addEventListener = function(eventType, listener) {
      if (!(eventType in this._listeners)) {
        this._listeners[eventType] = [];
      }
      var arr = this._listeners[eventType];
      // #4
      if (arr.indexOf(listener) === -1) {
        // Make a copy so as not to interfere with a current dispatchEvent.
        arr = arr.concat([listener]);
      }
      this._listeners[eventType] = arr;
    };

    EventTarget.prototype.removeEventListener = function(eventType, listener) {
      var arr = this._listeners[eventType];
      if (!arr) {
        return;
      }
      var idx = arr.indexOf(listener);
      if (idx !== -1) {
        if (arr.length > 1) {
          // Make a copy so as not to interfere with a current dispatchEvent.
          this._listeners[eventType] = arr.slice(0, idx).concat(arr.slice(idx + 1));
        } else {
          delete this._listeners[eventType];
        }
        return;
      }
    };

    EventTarget.prototype.dispatchEvent = function() {
      var event = arguments[0];
      var t = event.type;
      // equivalent of Array.prototype.slice.call(arguments, 0);
      var args = arguments.length === 1 ? [event] : Array.apply(null, arguments);
      // TODO: This doesn't match the real behavior; per spec, onfoo get
      // their place in line from the /first/ time they're set from
      // non-null. Although WebKit bumps it to the end every time it's
      // set.
      if (this['on' + t]) {
        this['on' + t].apply(this, args);
      }
      if (t in this._listeners) {
        // Grab a reference to the listeners list. removeEventListener may alter the list.
        var listeners = this._listeners[t];
        for (var i = 0; i < listeners.length; i++) {
          listeners[i].apply(this, args);
        }
      }
    };

    module.exports = EventTarget;

    },{}],6:[function(require,module,exports){

    var inherits = require('inherits')
      , Event = require('./event')
      ;

    function TransportMessageEvent(data) {
      Event.call(this);
      this.initEvent('message', false, false);
      this.data = data;
    }

    inherits(TransportMessageEvent, Event);

    module.exports = TransportMessageEvent;

    },{"./event":4,"inherits":57}],7:[function(require,module,exports){

    var JSON3 = require('json3')
      , iframeUtils = require('./utils/iframe')
      ;

    function FacadeJS(transport) {
      this._transport = transport;
      transport.on('message', this._transportMessage.bind(this));
      transport.on('close', this._transportClose.bind(this));
    }

    FacadeJS.prototype._transportClose = function(code, reason) {
      iframeUtils.postMessage('c', JSON3.stringify([code, reason]));
    };
    FacadeJS.prototype._transportMessage = function(frame) {
      iframeUtils.postMessage('t', frame);
    };
    FacadeJS.prototype._send = function(data) {
      this._transport.send(data);
    };
    FacadeJS.prototype._close = function() {
      this._transport.close();
      this._transport.removeAllListeners();
    };

    module.exports = FacadeJS;

    },{"./utils/iframe":47,"json3":58}],8:[function(require,module,exports){
    (function (process){

    var urlUtils = require('./utils/url')
      , eventUtils = require('./utils/event')
      , JSON3 = require('json3')
      , FacadeJS = require('./facade')
      , InfoIframeReceiver = require('./info-iframe-receiver')
      , iframeUtils = require('./utils/iframe')
      , loc = require('./location')
      ;

    var debug = function() {};
    if (process.env.NODE_ENV !== 'production') {
      debug = require('debug')('sockjs-client:iframe-bootstrap');
    }

    module.exports = function(SockJS, availableTransports) {
      var transportMap = {};
      availableTransports.forEach(function(at) {
        if (at.facadeTransport) {
          transportMap[at.facadeTransport.transportName] = at.facadeTransport;
        }
      });

      // hard-coded for the info iframe
      // TODO see if we can make this more dynamic
      transportMap[InfoIframeReceiver.transportName] = InfoIframeReceiver;
      var parentOrigin;

      /* eslint-disable camelcase */
      SockJS.bootstrap_iframe = function() {
        /* eslint-enable camelcase */
        var facade;
        iframeUtils.currentWindowId = loc.hash.slice(1);
        var onMessage = function(e) {
          if (e.source !== parent) {
            return;
          }
          if (typeof parentOrigin === 'undefined') {
            parentOrigin = e.origin;
          }
          if (e.origin !== parentOrigin) {
            return;
          }

          var iframeMessage;
          try {
            iframeMessage = JSON3.parse(e.data);
          } catch (ignored) {
            debug('bad json', e.data);
            return;
          }

          if (iframeMessage.windowId !== iframeUtils.currentWindowId) {
            return;
          }
          switch (iframeMessage.type) {
          case 's':
            var p;
            try {
              p = JSON3.parse(iframeMessage.data);
            } catch (ignored) {
              debug('bad json', iframeMessage.data);
              break;
            }
            var version = p[0];
            var transport = p[1];
            var transUrl = p[2];
            var baseUrl = p[3];
            debug(version, transport, transUrl, baseUrl);
            // change this to semver logic
            if (version !== SockJS.version) {
              throw new Error('Incompatible SockJS! Main site uses:' +
                        ' "' + version + '", the iframe:' +
                        ' "' + SockJS.version + '".');
            }

            if (!urlUtils.isOriginEqual(transUrl, loc.href) ||
                !urlUtils.isOriginEqual(baseUrl, loc.href)) {
              throw new Error('Can\'t connect to different domain from within an ' +
                        'iframe. (' + loc.href + ', ' + transUrl + ', ' + baseUrl + ')');
            }
            facade = new FacadeJS(new transportMap[transport](transUrl, baseUrl));
            break;
          case 'm':
            facade._send(iframeMessage.data);
            break;
          case 'c':
            if (facade) {
              facade._close();
            }
            facade = null;
            break;
          }
        };

        eventUtils.attachEvent('message', onMessage);

        // Start
        iframeUtils.postMessage('s');
      };
    };

    }).call(this,{ env: {} });

    },{"./facade":7,"./info-iframe-receiver":10,"./location":13,"./utils/event":46,"./utils/iframe":47,"./utils/url":52,"debug":55,"json3":58}],9:[function(require,module,exports){
    (function (process){

    var EventEmitter = require('events').EventEmitter
      , inherits = require('inherits')
      , JSON3 = require('json3')
      , objectUtils = require('./utils/object')
      ;

    var debug = function() {};
    if (process.env.NODE_ENV !== 'production') {
      debug = require('debug')('sockjs-client:info-ajax');
    }

    function InfoAjax(url, AjaxObject) {
      EventEmitter.call(this);

      var self = this;
      var t0 = +new Date();
      this.xo = new AjaxObject('GET', url);

      this.xo.once('finish', function(status, text) {
        var info, rtt;
        if (status === 200) {
          rtt = (+new Date()) - t0;
          if (text) {
            try {
              info = JSON3.parse(text);
            } catch (e) {
              debug('bad json', text);
            }
          }

          if (!objectUtils.isObject(info)) {
            info = {};
          }
        }
        self.emit('finish', info, rtt);
        self.removeAllListeners();
      });
    }

    inherits(InfoAjax, EventEmitter);

    InfoAjax.prototype.close = function() {
      this.removeAllListeners();
      this.xo.close();
    };

    module.exports = InfoAjax;

    }).call(this,{ env: {} });

    },{"./utils/object":49,"debug":55,"events":3,"inherits":57,"json3":58}],10:[function(require,module,exports){

    var inherits = require('inherits')
      , EventEmitter = require('events').EventEmitter
      , JSON3 = require('json3')
      , XHRLocalObject = require('./transport/sender/xhr-local')
      , InfoAjax = require('./info-ajax')
      ;

    function InfoReceiverIframe(transUrl) {
      var self = this;
      EventEmitter.call(this);

      this.ir = new InfoAjax(transUrl, XHRLocalObject);
      this.ir.once('finish', function(info, rtt) {
        self.ir = null;
        self.emit('message', JSON3.stringify([info, rtt]));
      });
    }

    inherits(InfoReceiverIframe, EventEmitter);

    InfoReceiverIframe.transportName = 'iframe-info-receiver';

    InfoReceiverIframe.prototype.close = function() {
      if (this.ir) {
        this.ir.close();
        this.ir = null;
      }
      this.removeAllListeners();
    };

    module.exports = InfoReceiverIframe;

    },{"./info-ajax":9,"./transport/sender/xhr-local":37,"events":3,"inherits":57,"json3":58}],11:[function(require,module,exports){
    (function (process,global){

    var EventEmitter = require('events').EventEmitter
      , inherits = require('inherits')
      , JSON3 = require('json3')
      , utils = require('./utils/event')
      , IframeTransport = require('./transport/iframe')
      , InfoReceiverIframe = require('./info-iframe-receiver')
      ;

    var debug = function() {};
    if (process.env.NODE_ENV !== 'production') {
      debug = require('debug')('sockjs-client:info-iframe');
    }

    function InfoIframe(baseUrl, url) {
      var self = this;
      EventEmitter.call(this);

      var go = function() {
        var ifr = self.ifr = new IframeTransport(InfoReceiverIframe.transportName, url, baseUrl);

        ifr.once('message', function(msg) {
          if (msg) {
            var d;
            try {
              d = JSON3.parse(msg);
            } catch (e) {
              debug('bad json', msg);
              self.emit('finish');
              self.close();
              return;
            }

            var info = d[0], rtt = d[1];
            self.emit('finish', info, rtt);
          }
          self.close();
        });

        ifr.once('close', function() {
          self.emit('finish');
          self.close();
        });
      };

      // TODO this seems the same as the 'needBody' from transports
      if (!global.document.body) {
        utils.attachEvent('load', go);
      } else {
        go();
      }
    }

    inherits(InfoIframe, EventEmitter);

    InfoIframe.enabled = function() {
      return IframeTransport.enabled();
    };

    InfoIframe.prototype.close = function() {
      if (this.ifr) {
        this.ifr.close();
      }
      this.removeAllListeners();
      this.ifr = null;
    };

    module.exports = InfoIframe;

    }).call(this,{ env: {} },typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

    },{"./info-iframe-receiver":10,"./transport/iframe":22,"./utils/event":46,"debug":55,"events":3,"inherits":57,"json3":58}],12:[function(require,module,exports){
    (function (process){

    var EventEmitter = require('events').EventEmitter
      , inherits = require('inherits')
      , urlUtils = require('./utils/url')
      , XDR = require('./transport/sender/xdr')
      , XHRCors = require('./transport/sender/xhr-cors')
      , XHRLocal = require('./transport/sender/xhr-local')
      , XHRFake = require('./transport/sender/xhr-fake')
      , InfoIframe = require('./info-iframe')
      , InfoAjax = require('./info-ajax')
      ;

    var debug = function() {};
    if (process.env.NODE_ENV !== 'production') {
      debug = require('debug')('sockjs-client:info-receiver');
    }

    function InfoReceiver(baseUrl, urlInfo) {
      debug(baseUrl);
      var self = this;
      EventEmitter.call(this);

      setTimeout(function() {
        self.doXhr(baseUrl, urlInfo);
      }, 0);
    }

    inherits(InfoReceiver, EventEmitter);

    // TODO this is currently ignoring the list of available transports and the whitelist

    InfoReceiver._getReceiver = function(baseUrl, url, urlInfo) {
      // determine method of CORS support (if needed)
      if (urlInfo.sameOrigin) {
        return new InfoAjax(url, XHRLocal);
      }
      if (XHRCors.enabled) {
        return new InfoAjax(url, XHRCors);
      }
      if (XDR.enabled && urlInfo.sameScheme) {
        return new InfoAjax(url, XDR);
      }
      if (InfoIframe.enabled()) {
        return new InfoIframe(baseUrl, url);
      }
      return new InfoAjax(url, XHRFake);
    };

    InfoReceiver.prototype.doXhr = function(baseUrl, urlInfo) {
      var self = this
        , url = urlUtils.addPath(baseUrl, '/info')
        ;
      debug('doXhr', url);

      this.xo = InfoReceiver._getReceiver(baseUrl, url, urlInfo);

      this.timeoutRef = setTimeout(function() {
        debug('timeout');
        self._cleanup(false);
        self.emit('finish');
      }, InfoReceiver.timeout);

      this.xo.once('finish', function(info, rtt) {
        debug('finish', info, rtt);
        self._cleanup(true);
        self.emit('finish', info, rtt);
      });
    };

    InfoReceiver.prototype._cleanup = function(wasClean) {
      debug('_cleanup');
      clearTimeout(this.timeoutRef);
      this.timeoutRef = null;
      if (!wasClean && this.xo) {
        this.xo.close();
      }
      this.xo = null;
    };

    InfoReceiver.prototype.close = function() {
      debug('close');
      this.removeAllListeners();
      this._cleanup(false);
    };

    InfoReceiver.timeout = 8000;

    module.exports = InfoReceiver;

    }).call(this,{ env: {} });

    },{"./info-ajax":9,"./info-iframe":11,"./transport/sender/xdr":34,"./transport/sender/xhr-cors":35,"./transport/sender/xhr-fake":36,"./transport/sender/xhr-local":37,"./utils/url":52,"debug":55,"events":3,"inherits":57}],13:[function(require,module,exports){
    (function (global){

    module.exports = global.location || {
      origin: 'http://localhost:80'
    , protocol: 'http:'
    , host: 'localhost'
    , port: 80
    , href: 'http://localhost/'
    , hash: ''
    };

    }).call(this,typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

    },{}],14:[function(require,module,exports){
    (function (process,global){

    require('./shims');

    var URL = require('url-parse')
      , inherits = require('inherits')
      , JSON3 = require('json3')
      , random = require('./utils/random')
      , escape = require('./utils/escape')
      , urlUtils = require('./utils/url')
      , eventUtils = require('./utils/event')
      , transport = require('./utils/transport')
      , objectUtils = require('./utils/object')
      , browser = require('./utils/browser')
      , log = require('./utils/log')
      , Event = require('./event/event')
      , EventTarget = require('./event/eventtarget')
      , loc = require('./location')
      , CloseEvent = require('./event/close')
      , TransportMessageEvent = require('./event/trans-message')
      , InfoReceiver = require('./info-receiver')
      ;

    var debug = function() {};
    if (process.env.NODE_ENV !== 'production') {
      debug = require('debug')('sockjs-client:main');
    }

    var transports;

    // follow constructor steps defined at http://dev.w3.org/html5/websockets/#the-websocket-interface
    function SockJS(url, protocols, options) {
      if (!(this instanceof SockJS)) {
        return new SockJS(url, protocols, options);
      }
      if (arguments.length < 1) {
        throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");
      }
      EventTarget.call(this);

      this.readyState = SockJS.CONNECTING;
      this.extensions = '';
      this.protocol = '';

      // non-standard extension
      options = options || {};
      if (options.protocols_whitelist) {
        log.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead.");
      }
      this._transportsWhitelist = options.transports;
      this._transportOptions = options.transportOptions || {};
      this._timeout = options.timeout || 0;

      var sessionId = options.sessionId || 8;
      if (typeof sessionId === 'function') {
        this._generateSessionId = sessionId;
      } else if (typeof sessionId === 'number') {
        this._generateSessionId = function() {
          return random.string(sessionId);
        };
      } else {
        throw new TypeError('If sessionId is used in the options, it needs to be a number or a function.');
      }

      this._server = options.server || random.numberString(1000);

      // Step 1 of WS spec - parse and validate the url. Issue #8
      var parsedUrl = new URL(url);
      if (!parsedUrl.host || !parsedUrl.protocol) {
        throw new SyntaxError("The URL '" + url + "' is invalid");
      } else if (parsedUrl.hash) {
        throw new SyntaxError('The URL must not contain a fragment');
      } else if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
        throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '" + parsedUrl.protocol + "' is not allowed.");
      }

      var secure = parsedUrl.protocol === 'https:';
      // Step 2 - don't allow secure origin with an insecure protocol
      if (loc.protocol === 'https:' && !secure) {
        // exception is 127.0.0.0/8 and ::1 urls
        if (!urlUtils.isLoopbackAddr(parsedUrl.hostname)) {
          throw new Error('SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS');
        }
      }

      // Step 3 - check port access - no need here
      // Step 4 - parse protocols argument
      if (!protocols) {
        protocols = [];
      } else if (!Array.isArray(protocols)) {
        protocols = [protocols];
      }

      // Step 5 - check protocols argument
      var sortedProtocols = protocols.sort();
      sortedProtocols.forEach(function(proto, i) {
        if (!proto) {
          throw new SyntaxError("The protocols entry '" + proto + "' is invalid.");
        }
        if (i < (sortedProtocols.length - 1) && proto === sortedProtocols[i + 1]) {
          throw new SyntaxError("The protocols entry '" + proto + "' is duplicated.");
        }
      });

      // Step 6 - convert origin
      var o = urlUtils.getOrigin(loc.href);
      this._origin = o ? o.toLowerCase() : null;

      // remove the trailing slash
      parsedUrl.set('pathname', parsedUrl.pathname.replace(/\/+$/, ''));

      // store the sanitized url
      this.url = parsedUrl.href;
      debug('using url', this.url);

      // Step 7 - start connection in background
      // obtain server info
      // http://sockjs.github.io/sockjs-protocol/sockjs-protocol-0.3.3.html#section-26
      this._urlInfo = {
        nullOrigin: !browser.hasDomain()
      , sameOrigin: urlUtils.isOriginEqual(this.url, loc.href)
      , sameScheme: urlUtils.isSchemeEqual(this.url, loc.href)
      };

      this._ir = new InfoReceiver(this.url, this._urlInfo);
      this._ir.once('finish', this._receiveInfo.bind(this));
    }

    inherits(SockJS, EventTarget);

    function userSetCode(code) {
      return code === 1000 || (code >= 3000 && code <= 4999);
    }

    SockJS.prototype.close = function(code, reason) {
      // Step 1
      if (code && !userSetCode(code)) {
        throw new Error('InvalidAccessError: Invalid code');
      }
      // Step 2.4 states the max is 123 bytes, but we are just checking length
      if (reason && reason.length > 123) {
        throw new SyntaxError('reason argument has an invalid length');
      }

      // Step 3.1
      if (this.readyState === SockJS.CLOSING || this.readyState === SockJS.CLOSED) {
        return;
      }

      // TODO look at docs to determine how to set this
      var wasClean = true;
      this._close(code || 1000, reason || 'Normal closure', wasClean);
    };

    SockJS.prototype.send = function(data) {
      // #13 - convert anything non-string to string
      // TODO this currently turns objects into [object Object]
      if (typeof data !== 'string') {
        data = '' + data;
      }
      if (this.readyState === SockJS.CONNECTING) {
        throw new Error('InvalidStateError: The connection has not been established yet');
      }
      if (this.readyState !== SockJS.OPEN) {
        return;
      }
      this._transport.send(escape.quote(data));
    };

    SockJS.version = require('./version');

    SockJS.CONNECTING = 0;
    SockJS.OPEN = 1;
    SockJS.CLOSING = 2;
    SockJS.CLOSED = 3;

    SockJS.prototype._receiveInfo = function(info, rtt) {
      debug('_receiveInfo', rtt);
      this._ir = null;
      if (!info) {
        this._close(1002, 'Cannot connect to server');
        return;
      }

      // establish a round-trip timeout (RTO) based on the
      // round-trip time (RTT)
      this._rto = this.countRTO(rtt);
      // allow server to override url used for the actual transport
      this._transUrl = info.base_url ? info.base_url : this.url;
      info = objectUtils.extend(info, this._urlInfo);
      debug('info', info);
      // determine list of desired and supported transports
      var enabledTransports = transports.filterToEnabled(this._transportsWhitelist, info);
      this._transports = enabledTransports.main;
      debug(this._transports.length + ' enabled transports');

      this._connect();
    };

    SockJS.prototype._connect = function() {
      for (var Transport = this._transports.shift(); Transport; Transport = this._transports.shift()) {
        debug('attempt', Transport.transportName);
        if (Transport.needBody) {
          if (!global.document.body ||
              (typeof global.document.readyState !== 'undefined' &&
                global.document.readyState !== 'complete' &&
                global.document.readyState !== 'interactive')) {
            debug('waiting for body');
            this._transports.unshift(Transport);
            eventUtils.attachEvent('load', this._connect.bind(this));
            return;
          }
        }

        // calculate timeout based on RTO and round trips. Default to 5s
        var timeoutMs = Math.max(this._timeout, (this._rto * Transport.roundTrips) || 5000);
        this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), timeoutMs);
        debug('using timeout', timeoutMs);

        var transportUrl = urlUtils.addPath(this._transUrl, '/' + this._server + '/' + this._generateSessionId());
        var options = this._transportOptions[Transport.transportName];
        debug('transport url', transportUrl);
        var transportObj = new Transport(transportUrl, this._transUrl, options);
        transportObj.on('message', this._transportMessage.bind(this));
        transportObj.once('close', this._transportClose.bind(this));
        transportObj.transportName = Transport.transportName;
        this._transport = transportObj;

        return;
      }
      this._close(2000, 'All transports failed', false);
    };

    SockJS.prototype._transportTimeout = function() {
      debug('_transportTimeout');
      if (this.readyState === SockJS.CONNECTING) {
        if (this._transport) {
          this._transport.close();
        }

        this._transportClose(2007, 'Transport timed out');
      }
    };

    SockJS.prototype._transportMessage = function(msg) {
      debug('_transportMessage', msg);
      var self = this
        , type = msg.slice(0, 1)
        , content = msg.slice(1)
        , payload
        ;

      // first check for messages that don't need a payload
      switch (type) {
        case 'o':
          this._open();
          return;
        case 'h':
          this.dispatchEvent(new Event('heartbeat'));
          debug('heartbeat', this.transport);
          return;
      }

      if (content) {
        try {
          payload = JSON3.parse(content);
        } catch (e) {
          debug('bad json', content);
        }
      }

      if (typeof payload === 'undefined') {
        debug('empty payload', content);
        return;
      }

      switch (type) {
        case 'a':
          if (Array.isArray(payload)) {
            payload.forEach(function(p) {
              debug('message', self.transport, p);
              self.dispatchEvent(new TransportMessageEvent(p));
            });
          }
          break;
        case 'm':
          debug('message', this.transport, payload);
          this.dispatchEvent(new TransportMessageEvent(payload));
          break;
        case 'c':
          if (Array.isArray(payload) && payload.length === 2) {
            this._close(payload[0], payload[1], true);
          }
          break;
      }
    };

    SockJS.prototype._transportClose = function(code, reason) {
      debug('_transportClose', this.transport, code, reason);
      if (this._transport) {
        this._transport.removeAllListeners();
        this._transport = null;
        this.transport = null;
      }

      if (!userSetCode(code) && code !== 2000 && this.readyState === SockJS.CONNECTING) {
        this._connect();
        return;
      }

      this._close(code, reason);
    };

    SockJS.prototype._open = function() {
      debug('_open', this._transport && this._transport.transportName, this.readyState);
      if (this.readyState === SockJS.CONNECTING) {
        if (this._transportTimeoutId) {
          clearTimeout(this._transportTimeoutId);
          this._transportTimeoutId = null;
        }
        this.readyState = SockJS.OPEN;
        this.transport = this._transport.transportName;
        this.dispatchEvent(new Event('open'));
        debug('connected', this.transport);
      } else {
        // The server might have been restarted, and lost track of our
        // connection.
        this._close(1006, 'Server lost session');
      }
    };

    SockJS.prototype._close = function(code, reason, wasClean) {
      debug('_close', this.transport, code, reason, wasClean, this.readyState);
      var forceFail = false;

      if (this._ir) {
        forceFail = true;
        this._ir.close();
        this._ir = null;
      }
      if (this._transport) {
        this._transport.close();
        this._transport = null;
        this.transport = null;
      }

      if (this.readyState === SockJS.CLOSED) {
        throw new Error('InvalidStateError: SockJS has already been closed');
      }

      this.readyState = SockJS.CLOSING;
      setTimeout(function() {
        this.readyState = SockJS.CLOSED;

        if (forceFail) {
          this.dispatchEvent(new Event('error'));
        }

        var e = new CloseEvent('close');
        e.wasClean = wasClean || false;
        e.code = code || 1000;
        e.reason = reason;

        this.dispatchEvent(e);
        this.onmessage = this.onclose = this.onerror = null;
        debug('disconnected');
      }.bind(this), 0);
    };

    // See: http://www.erg.abdn.ac.uk/~gerrit/dccp/notes/ccid2/rto_estimator/
    // and RFC 2988.
    SockJS.prototype.countRTO = function(rtt) {
      // In a local environment, when using IE8/9 and the `jsonp-polling`
      // transport the time needed to establish a connection (the time that pass
      // from the opening of the transport to the call of `_dispatchOpen`) is
      // around 200msec (the lower bound used in the article above) and this
      // causes spurious timeouts. For this reason we calculate a value slightly
      // larger than that used in the article.
      if (rtt > 100) {
        return 4 * rtt; // rto > 400msec
      }
      return 300 + rtt; // 300msec < rto <= 400msec
    };

    module.exports = function(availableTransports) {
      transports = transport(availableTransports);
      require('./iframe-bootstrap')(SockJS, availableTransports);
      return SockJS;
    };

    }).call(this,{ env: {} },typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

    },{"./event/close":2,"./event/event":4,"./event/eventtarget":5,"./event/trans-message":6,"./iframe-bootstrap":8,"./info-receiver":12,"./location":13,"./shims":15,"./utils/browser":44,"./utils/escape":45,"./utils/event":46,"./utils/log":48,"./utils/object":49,"./utils/random":50,"./utils/transport":51,"./utils/url":52,"./version":53,"debug":55,"inherits":57,"json3":58,"url-parse":61}],15:[function(require,module,exports){

    // pulled specific shims from https://github.com/es-shims/es5-shim

    var ArrayPrototype = Array.prototype;
    var ObjectPrototype = Object.prototype;
    var FunctionPrototype = Function.prototype;
    var StringPrototype = String.prototype;
    var array_slice = ArrayPrototype.slice;

    var _toString = ObjectPrototype.toString;
    var isFunction = function (val) {
        return ObjectPrototype.toString.call(val) === '[object Function]';
    };
    var isArray = function isArray(obj) {
        return _toString.call(obj) === '[object Array]';
    };
    var isString = function isString(obj) {
        return _toString.call(obj) === '[object String]';
    };

    var supportsDescriptors = Object.defineProperty && (function () {
        try {
            Object.defineProperty({}, 'x', {});
            return true;
        } catch (e) { /* this is ES3 */
            return false;
        }
    }());

    // Define configurable, writable and non-enumerable props
    // if they don't exist.
    var defineProperty;
    if (supportsDescriptors) {
        defineProperty = function (object, name, method, forceAssign) {
            if (!forceAssign && (name in object)) { return; }
            Object.defineProperty(object, name, {
                configurable: true,
                enumerable: false,
                writable: true,
                value: method
            });
        };
    } else {
        defineProperty = function (object, name, method, forceAssign) {
            if (!forceAssign && (name in object)) { return; }
            object[name] = method;
        };
    }
    var defineProperties = function (object, map, forceAssign) {
        for (var name in map) {
            if (ObjectPrototype.hasOwnProperty.call(map, name)) {
              defineProperty(object, name, map[name], forceAssign);
            }
        }
    };

    var toObject = function (o) {
        if (o == null) { // this matches both null and undefined
            throw new TypeError("can't convert " + o + ' to object');
        }
        return Object(o);
    };

    //
    // Util
    // ======
    //

    // ES5 9.4
    // http://es5.github.com/#x9.4
    // http://jsperf.com/to-integer

    function toInteger(num) {
        var n = +num;
        if (n !== n) { // isNaN
            n = 0;
        } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
            n = (n > 0 || -1) * Math.floor(Math.abs(n));
        }
        return n;
    }

    function ToUint32(x) {
        return x >>> 0;
    }

    //
    // Function
    // ========
    //

    // ES-5 15.3.4.5
    // http://es5.github.com/#x15.3.4.5

    function Empty() {}

    defineProperties(FunctionPrototype, {
        bind: function bind(that) { // .length is 1
            // 1. Let Target be the this value.
            var target = this;
            // 2. If IsCallable(Target) is false, throw a TypeError exception.
            if (!isFunction(target)) {
                throw new TypeError('Function.prototype.bind called on incompatible ' + target);
            }
            // 3. Let A be a new (possibly empty) internal list of all of the
            //   argument values provided after thisArg (arg1, arg2 etc), in order.
            // XXX slicedArgs will stand in for "A" if used
            var args = array_slice.call(arguments, 1); // for normal call
            // 4. Let F be a new native ECMAScript object.
            // 11. Set the [[Prototype]] internal property of F to the standard
            //   built-in Function prototype object as specified in 15.3.3.1.
            // 12. Set the [[Call]] internal property of F as described in
            //   15.3.4.5.1.
            // 13. Set the [[Construct]] internal property of F as described in
            //   15.3.4.5.2.
            // 14. Set the [[HasInstance]] internal property of F as described in
            //   15.3.4.5.3.
            var binder = function () {

                if (this instanceof bound) {
                    // 15.3.4.5.2 [[Construct]]
                    // When the [[Construct]] internal method of a function object,
                    // F that was created using the bind function is called with a
                    // list of arguments ExtraArgs, the following steps are taken:
                    // 1. Let target be the value of F's [[TargetFunction]]
                    //   internal property.
                    // 2. If target has no [[Construct]] internal method, a
                    //   TypeError exception is thrown.
                    // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
                    //   property.
                    // 4. Let args be a new list containing the same values as the
                    //   list boundArgs in the same order followed by the same
                    //   values as the list ExtraArgs in the same order.
                    // 5. Return the result of calling the [[Construct]] internal
                    //   method of target providing args as the arguments.

                    var result = target.apply(
                        this,
                        args.concat(array_slice.call(arguments))
                    );
                    if (Object(result) === result) {
                        return result;
                    }
                    return this;

                } else {
                    // 15.3.4.5.1 [[Call]]
                    // When the [[Call]] internal method of a function object, F,
                    // which was created using the bind function is called with a
                    // this value and a list of arguments ExtraArgs, the following
                    // steps are taken:
                    // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
                    //   property.
                    // 2. Let boundThis be the value of F's [[BoundThis]] internal
                    //   property.
                    // 3. Let target be the value of F's [[TargetFunction]] internal
                    //   property.
                    // 4. Let args be a new list containing the same values as the
                    //   list boundArgs in the same order followed by the same
                    //   values as the list ExtraArgs in the same order.
                    // 5. Return the result of calling the [[Call]] internal method
                    //   of target providing boundThis as the this value and
                    //   providing args as the arguments.

                    // equiv: target.call(this, ...boundArgs, ...args)
                    return target.apply(
                        that,
                        args.concat(array_slice.call(arguments))
                    );

                }

            };

            // 15. If the [[Class]] internal property of Target is "Function", then
            //     a. Let L be the length property of Target minus the length of A.
            //     b. Set the length own property of F to either 0 or L, whichever is
            //       larger.
            // 16. Else set the length own property of F to 0.

            var boundLength = Math.max(0, target.length - args.length);

            // 17. Set the attributes of the length own property of F to the values
            //   specified in 15.3.5.1.
            var boundArgs = [];
            for (var i = 0; i < boundLength; i++) {
                boundArgs.push('$' + i);
            }

            // XXX Build a dynamic function with desired amount of arguments is the only
            // way to set the length property of a function.
            // In environments where Content Security Policies enabled (Chrome extensions,
            // for ex.) all use of eval or Function costructor throws an exception.
            // However in all of these environments Function.prototype.bind exists
            // and so this code will never be executed.
            var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

            if (target.prototype) {
                Empty.prototype = target.prototype;
                bound.prototype = new Empty();
                // Clean up dangling references.
                Empty.prototype = null;
            }

            // TODO
            // 18. Set the [[Extensible]] internal property of F to true.

            // TODO
            // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
            // 20. Call the [[DefineOwnProperty]] internal method of F with
            //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
            //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
            //   false.
            // 21. Call the [[DefineOwnProperty]] internal method of F with
            //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
            //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
            //   and false.

            // TODO
            // NOTE Function objects created using Function.prototype.bind do not
            // have a prototype property or the [[Code]], [[FormalParameters]], and
            // [[Scope]] internal properties.
            // XXX can't delete prototype in pure-js.

            // 22. Return F.
            return bound;
        }
    });

    //
    // Array
    // =====
    //

    // ES5 15.4.3.2
    // http://es5.github.com/#x15.4.3.2
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
    defineProperties(Array, { isArray: isArray });


    var boxedString = Object('a');
    var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

    var properlyBoxesContext = function properlyBoxed(method) {
        // Check node 0.6.21 bug where third parameter is not boxed
        var properlyBoxesNonStrict = true;
        var properlyBoxesStrict = true;
        if (method) {
            method.call('foo', function (_, __, context) {
                if (typeof context !== 'object') { properlyBoxesNonStrict = false; }
            });

            method.call([1], function () {
                properlyBoxesStrict = typeof this === 'string';
            }, 'x');
        }
        return !!method && properlyBoxesNonStrict && properlyBoxesStrict;
    };

    defineProperties(ArrayPrototype, {
        forEach: function forEach(fun /*, thisp*/) {
            var object = toObject(this),
                self = splitString && isString(this) ? this.split('') : object,
                thisp = arguments[1],
                i = -1,
                length = self.length >>> 0;

            // If no callback function or if callback is not a callable function
            if (!isFunction(fun)) {
                throw new TypeError(); // TODO message
            }

            while (++i < length) {
                if (i in self) {
                    // Invoke the callback function with call, passing arguments:
                    // context, property value, property key, thisArg object
                    // context
                    fun.call(thisp, self[i], i, object);
                }
            }
        }
    }, !properlyBoxesContext(ArrayPrototype.forEach));

    // ES5 15.4.4.14
    // http://es5.github.com/#x15.4.4.14
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
    var hasFirefox2IndexOfBug = Array.prototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
    defineProperties(ArrayPrototype, {
        indexOf: function indexOf(sought /*, fromIndex */ ) {
            var self = splitString && isString(this) ? this.split('') : toObject(this),
                length = self.length >>> 0;

            if (!length) {
                return -1;
            }

            var i = 0;
            if (arguments.length > 1) {
                i = toInteger(arguments[1]);
            }

            // handle negative indices
            i = i >= 0 ? i : Math.max(0, length + i);
            for (; i < length; i++) {
                if (i in self && self[i] === sought) {
                    return i;
                }
            }
            return -1;
        }
    }, hasFirefox2IndexOfBug);

    //
    // String
    // ======
    //

    // ES5 15.5.4.14
    // http://es5.github.com/#x15.5.4.14

    // [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
    // Many browsers do not split properly with regular expressions or they
    // do not perform the split correctly under obscure conditions.
    // See http://blog.stevenlevithan.com/archives/cross-browser-split
    // I've tested in many browsers and this seems to cover the deviant ones:
    //    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
    //    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
    //    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
    //       [undefined, "t", undefined, "e", ...]
    //    ''.split(/.?/) should be [], not [""]
    //    '.'.split(/()()/) should be ["."], not ["", "", "."]

    var string_split = StringPrototype.split;
    if (
        'ab'.split(/(?:ab)*/).length !== 2 ||
        '.'.split(/(.?)(.?)/).length !== 4 ||
        'tesst'.split(/(s)*/)[1] === 't' ||
        'test'.split(/(?:)/, -1).length !== 4 ||
        ''.split(/.?/).length ||
        '.'.split(/()()/).length > 1
    ) {
        (function () {
            var compliantExecNpcg = /()??/.exec('')[1] === void 0; // NPCG: nonparticipating capturing group

            StringPrototype.split = function (separator, limit) {
                var string = this;
                if (separator === void 0 && limit === 0) {
                    return [];
                }

                // If `separator` is not a regex, use native split
                if (_toString.call(separator) !== '[object RegExp]') {
                    return string_split.call(this, separator, limit);
                }

                var output = [],
                    flags = (separator.ignoreCase ? 'i' : '') +
                            (separator.multiline  ? 'm' : '') +
                            (separator.extended   ? 'x' : '') + // Proposed for ES6
                            (separator.sticky     ? 'y' : ''), // Firefox 3+
                    lastLastIndex = 0,
                    // Make `global` and avoid `lastIndex` issues by working with a copy
                    separator2, match, lastIndex, lastLength;
                separator = new RegExp(separator.source, flags + 'g');
                string += ''; // Type-convert
                if (!compliantExecNpcg) {
                    // Doesn't need flags gy, but they don't hurt
                    separator2 = new RegExp('^' + separator.source + '$(?!\\s)', flags);
                }
                /* Values for `limit`, per the spec:
                 * If undefined: 4294967295 // Math.pow(2, 32) - 1
                 * If 0, Infinity, or NaN: 0
                 * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
                 * If negative number: 4294967296 - Math.floor(Math.abs(limit))
                 * If other: Type-convert, then use the above rules
                 */
                limit = limit === void 0 ?
                    -1 >>> 0 : // Math.pow(2, 32) - 1
                    ToUint32(limit);
                while (match = separator.exec(string)) {
                    // `separator.lastIndex` is not reliable cross-browser
                    lastIndex = match.index + match[0].length;
                    if (lastIndex > lastLastIndex) {
                        output.push(string.slice(lastLastIndex, match.index));
                        // Fix browsers whose `exec` methods don't consistently return `undefined` for
                        // nonparticipating capturing groups
                        if (!compliantExecNpcg && match.length > 1) {
                            match[0].replace(separator2, function () {
                                for (var i = 1; i < arguments.length - 2; i++) {
                                    if (arguments[i] === void 0) {
                                        match[i] = void 0;
                                    }
                                }
                            });
                        }
                        if (match.length > 1 && match.index < string.length) {
                            ArrayPrototype.push.apply(output, match.slice(1));
                        }
                        lastLength = match[0].length;
                        lastLastIndex = lastIndex;
                        if (output.length >= limit) {
                            break;
                        }
                    }
                    if (separator.lastIndex === match.index) {
                        separator.lastIndex++; // Avoid an infinite loop
                    }
                }
                if (lastLastIndex === string.length) {
                    if (lastLength || !separator.test('')) {
                        output.push('');
                    }
                } else {
                    output.push(string.slice(lastLastIndex));
                }
                return output.length > limit ? output.slice(0, limit) : output;
            };
        }());

    // [bugfix, chrome]
    // If separator is undefined, then the result array contains just one String,
    // which is the this value (converted to a String). If limit is not undefined,
    // then the output array is truncated so that it contains no more than limit
    // elements.
    // "0".split(undefined, 0) -> []
    } else if ('0'.split(void 0, 0).length) {
        StringPrototype.split = function split(separator, limit) {
            if (separator === void 0 && limit === 0) { return []; }
            return string_split.call(this, separator, limit);
        };
    }

    // ECMA-262, 3rd B.2.3
    // Not an ECMAScript standard, although ECMAScript 3rd Edition has a
    // non-normative section suggesting uniform semantics and it should be
    // normalized across all browsers
    // [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
    var string_substr = StringPrototype.substr;
    var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
    defineProperties(StringPrototype, {
        substr: function substr(start, length) {
            return string_substr.call(
                this,
                start < 0 ? ((start = this.length + start) < 0 ? 0 : start) : start,
                length
            );
        }
    }, hasNegativeSubstrBug);

    },{}],16:[function(require,module,exports){

    module.exports = [
      // streaming transports
      require('./transport/websocket')
    , require('./transport/xhr-streaming')
    , require('./transport/xdr-streaming')
    , require('./transport/eventsource')
    , require('./transport/lib/iframe-wrap')(require('./transport/eventsource'))

      // polling transports
    , require('./transport/htmlfile')
    , require('./transport/lib/iframe-wrap')(require('./transport/htmlfile'))
    , require('./transport/xhr-polling')
    , require('./transport/xdr-polling')
    , require('./transport/lib/iframe-wrap')(require('./transport/xhr-polling'))
    , require('./transport/jsonp-polling')
    ];

    },{"./transport/eventsource":20,"./transport/htmlfile":21,"./transport/jsonp-polling":23,"./transport/lib/iframe-wrap":26,"./transport/websocket":38,"./transport/xdr-polling":39,"./transport/xdr-streaming":40,"./transport/xhr-polling":41,"./transport/xhr-streaming":42}],17:[function(require,module,exports){
    (function (process,global){

    var EventEmitter = require('events').EventEmitter
      , inherits = require('inherits')
      , utils = require('../../utils/event')
      , urlUtils = require('../../utils/url')
      , XHR = global.XMLHttpRequest
      ;

    var debug = function() {};
    if (process.env.NODE_ENV !== 'production') {
      debug = require('debug')('sockjs-client:browser:xhr');
    }

    function AbstractXHRObject(method, url, payload, opts) {
      debug(method, url);
      var self = this;
      EventEmitter.call(this);

      setTimeout(function () {
        self._start(method, url, payload, opts);
      }, 0);
    }

    inherits(AbstractXHRObject, EventEmitter);

    AbstractXHRObject.prototype._start = function(method, url, payload, opts) {
      var self = this;

      try {
        this.xhr = new XHR();
      } catch (x) {
        // intentionally empty
      }

      if (!this.xhr) {
        debug('no xhr');
        this.emit('finish', 0, 'no xhr support');
        this._cleanup();
        return;
      }

      // several browsers cache POSTs
      url = urlUtils.addQuery(url, 't=' + (+new Date()));

      // Explorer tends to keep connection open, even after the
      // tab gets closed: http://bugs.jquery.com/ticket/5280
      this.unloadRef = utils.unloadAdd(function() {
        debug('unload cleanup');
        self._cleanup(true);
      });
      try {
        this.xhr.open(method, url, true);
        if (this.timeout && 'timeout' in this.xhr) {
          this.xhr.timeout = this.timeout;
          this.xhr.ontimeout = function() {
            debug('xhr timeout');
            self.emit('finish', 0, '');
            self._cleanup(false);
          };
        }
      } catch (e) {
        debug('exception', e);
        // IE raises an exception on wrong port.
        this.emit('finish', 0, '');
        this._cleanup(false);
        return;
      }

      if ((!opts || !opts.noCredentials) && AbstractXHRObject.supportsCORS) {
        debug('withCredentials');
        // Mozilla docs says https://developer.mozilla.org/en/XMLHttpRequest :
        // "This never affects same-site requests."

        this.xhr.withCredentials = true;
      }
      if (opts && opts.headers) {
        for (var key in opts.headers) {
          this.xhr.setRequestHeader(key, opts.headers[key]);
        }
      }

      this.xhr.onreadystatechange = function() {
        if (self.xhr) {
          var x = self.xhr;
          var text, status;
          debug('readyState', x.readyState);
          switch (x.readyState) {
          case 3:
            // IE doesn't like peeking into responseText or status
            // on Microsoft.XMLHTTP and readystate=3
            try {
              status = x.status;
              text = x.responseText;
            } catch (e) {
              // intentionally empty
            }
            debug('status', status);
            // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
            if (status === 1223) {
              status = 204;
            }

            // IE does return readystate == 3 for 404 answers.
            if (status === 200 && text && text.length > 0) {
              debug('chunk');
              self.emit('chunk', status, text);
            }
            break;
          case 4:
            status = x.status;
            debug('status', status);
            // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
            if (status === 1223) {
              status = 204;
            }
            // IE returns this for a bad port
            // http://msdn.microsoft.com/en-us/library/windows/desktop/aa383770(v=vs.85).aspx
            if (status === 12005 || status === 12029) {
              status = 0;
            }

            debug('finish', status, x.responseText);
            self.emit('finish', status, x.responseText);
            self._cleanup(false);
            break;
          }
        }
      };

      try {
        self.xhr.send(payload);
      } catch (e) {
        self.emit('finish', 0, '');
        self._cleanup(false);
      }
    };

    AbstractXHRObject.prototype._cleanup = function(abort) {
      debug('cleanup');
      if (!this.xhr) {
        return;
      }
      this.removeAllListeners();
      utils.unloadDel(this.unloadRef);

      // IE needs this field to be a function
      this.xhr.onreadystatechange = function() {};
      if (this.xhr.ontimeout) {
        this.xhr.ontimeout = null;
      }

      if (abort) {
        try {
          this.xhr.abort();
        } catch (x) {
          // intentionally empty
        }
      }
      this.unloadRef = this.xhr = null;
    };

    AbstractXHRObject.prototype.close = function() {
      debug('close');
      this._cleanup(true);
    };

    AbstractXHRObject.enabled = !!XHR;
    // override XMLHttpRequest for IE6/7
    // obfuscate to avoid firewalls
    var axo = ['Active'].concat('Object').join('X');
    if (!AbstractXHRObject.enabled && (axo in global)) {
      debug('overriding xmlhttprequest');
      XHR = function() {
        try {
          return new global[axo]('Microsoft.XMLHTTP');
        } catch (e) {
          return null;
        }
      };
      AbstractXHRObject.enabled = !!new XHR();
    }

    var cors = false;
    try {
      cors = 'withCredentials' in new XHR();
    } catch (ignored) {
      // intentionally empty
    }

    AbstractXHRObject.supportsCORS = cors;

    module.exports = AbstractXHRObject;

    }).call(this,{ env: {} },typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

    },{"../../utils/event":46,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],18:[function(require,module,exports){
    (function (global){
    module.exports = global.EventSource;

    }).call(this,typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

    },{}],19:[function(require,module,exports){
    (function (global){

    var Driver = global.WebSocket || global.MozWebSocket;
    if (Driver) {
    	module.exports = function WebSocketBrowserDriver(url) {
    		return new Driver(url);
    	};
    } else {
    	module.exports = undefined;
    }

    }).call(this,typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

    },{}],20:[function(require,module,exports){

    var inherits = require('inherits')
      , AjaxBasedTransport = require('./lib/ajax-based')
      , EventSourceReceiver = require('./receiver/eventsource')
      , XHRCorsObject = require('./sender/xhr-cors')
      , EventSourceDriver = require('eventsource')
      ;

    function EventSourceTransport(transUrl) {
      if (!EventSourceTransport.enabled()) {
        throw new Error('Transport created when disabled');
      }

      AjaxBasedTransport.call(this, transUrl, '/eventsource', EventSourceReceiver, XHRCorsObject);
    }

    inherits(EventSourceTransport, AjaxBasedTransport);

    EventSourceTransport.enabled = function() {
      return !!EventSourceDriver;
    };

    EventSourceTransport.transportName = 'eventsource';
    EventSourceTransport.roundTrips = 2;

    module.exports = EventSourceTransport;

    },{"./lib/ajax-based":24,"./receiver/eventsource":29,"./sender/xhr-cors":35,"eventsource":18,"inherits":57}],21:[function(require,module,exports){

    var inherits = require('inherits')
      , HtmlfileReceiver = require('./receiver/htmlfile')
      , XHRLocalObject = require('./sender/xhr-local')
      , AjaxBasedTransport = require('./lib/ajax-based')
      ;

    function HtmlFileTransport(transUrl) {
      if (!HtmlfileReceiver.enabled) {
        throw new Error('Transport created when disabled');
      }
      AjaxBasedTransport.call(this, transUrl, '/htmlfile', HtmlfileReceiver, XHRLocalObject);
    }

    inherits(HtmlFileTransport, AjaxBasedTransport);

    HtmlFileTransport.enabled = function(info) {
      return HtmlfileReceiver.enabled && info.sameOrigin;
    };

    HtmlFileTransport.transportName = 'htmlfile';
    HtmlFileTransport.roundTrips = 2;

    module.exports = HtmlFileTransport;

    },{"./lib/ajax-based":24,"./receiver/htmlfile":30,"./sender/xhr-local":37,"inherits":57}],22:[function(require,module,exports){
    (function (process){

    // Few cool transports do work only for same-origin. In order to make
    // them work cross-domain we shall use iframe, served from the
    // remote domain. New browsers have capabilities to communicate with
    // cross domain iframe using postMessage(). In IE it was implemented
    // from IE 8+, but of course, IE got some details wrong:
    //    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
    //    http://stevesouders.com/misc/test-postmessage.php

    var inherits = require('inherits')
      , JSON3 = require('json3')
      , EventEmitter = require('events').EventEmitter
      , version = require('../version')
      , urlUtils = require('../utils/url')
      , iframeUtils = require('../utils/iframe')
      , eventUtils = require('../utils/event')
      , random = require('../utils/random')
      ;

    var debug = function() {};
    if (process.env.NODE_ENV !== 'production') {
      debug = require('debug')('sockjs-client:transport:iframe');
    }

    function IframeTransport(transport, transUrl, baseUrl) {
      if (!IframeTransport.enabled()) {
        throw new Error('Transport created when disabled');
      }
      EventEmitter.call(this);

      var self = this;
      this.origin = urlUtils.getOrigin(baseUrl);
      this.baseUrl = baseUrl;
      this.transUrl = transUrl;
      this.transport = transport;
      this.windowId = random.string(8);

      var iframeUrl = urlUtils.addPath(baseUrl, '/iframe.html') + '#' + this.windowId;
      debug(transport, transUrl, iframeUrl);

      this.iframeObj = iframeUtils.createIframe(iframeUrl, function(r) {
        debug('err callback');
        self.emit('close', 1006, 'Unable to load an iframe (' + r + ')');
        self.close();
      });

      this.onmessageCallback = this._message.bind(this);
      eventUtils.attachEvent('message', this.onmessageCallback);
    }

    inherits(IframeTransport, EventEmitter);

    IframeTransport.prototype.close = function() {
      debug('close');
      this.removeAllListeners();
      if (this.iframeObj) {
        eventUtils.detachEvent('message', this.onmessageCallback);
        try {
          // When the iframe is not loaded, IE raises an exception
          // on 'contentWindow'.
          this.postMessage('c');
        } catch (x) {
          // intentionally empty
        }
        this.iframeObj.cleanup();
        this.iframeObj = null;
        this.onmessageCallback = this.iframeObj = null;
      }
    };

    IframeTransport.prototype._message = function(e) {
      debug('message', e.data);
      if (!urlUtils.isOriginEqual(e.origin, this.origin)) {
        debug('not same origin', e.origin, this.origin);
        return;
      }

      var iframeMessage;
      try {
        iframeMessage = JSON3.parse(e.data);
      } catch (ignored) {
        debug('bad json', e.data);
        return;
      }

      if (iframeMessage.windowId !== this.windowId) {
        debug('mismatched window id', iframeMessage.windowId, this.windowId);
        return;
      }

      switch (iframeMessage.type) {
      case 's':
        this.iframeObj.loaded();
        // window global dependency
        this.postMessage('s', JSON3.stringify([
          version
        , this.transport
        , this.transUrl
        , this.baseUrl
        ]));
        break;
      case 't':
        this.emit('message', iframeMessage.data);
        break;
      case 'c':
        var cdata;
        try {
          cdata = JSON3.parse(iframeMessage.data);
        } catch (ignored) {
          debug('bad json', iframeMessage.data);
          return;
        }
        this.emit('close', cdata[0], cdata[1]);
        this.close();
        break;
      }
    };

    IframeTransport.prototype.postMessage = function(type, data) {
      debug('postMessage', type, data);
      this.iframeObj.post(JSON3.stringify({
        windowId: this.windowId
      , type: type
      , data: data || ''
      }), this.origin);
    };

    IframeTransport.prototype.send = function(message) {
      debug('send', message);
      this.postMessage('m', message);
    };

    IframeTransport.enabled = function() {
      return iframeUtils.iframeEnabled;
    };

    IframeTransport.transportName = 'iframe';
    IframeTransport.roundTrips = 2;

    module.exports = IframeTransport;

    }).call(this,{ env: {} });

    },{"../utils/event":46,"../utils/iframe":47,"../utils/random":50,"../utils/url":52,"../version":53,"debug":55,"events":3,"inherits":57,"json3":58}],23:[function(require,module,exports){
    (function (global){

    // The simplest and most robust transport, using the well-know cross
    // domain hack - JSONP. This transport is quite inefficient - one
    // message could use up to one http request. But at least it works almost
    // everywhere.
    // Known limitations:
    //   o you will get a spinning cursor
    //   o for Konqueror a dumb timer is needed to detect errors

    var inherits = require('inherits')
      , SenderReceiver = require('./lib/sender-receiver')
      , JsonpReceiver = require('./receiver/jsonp')
      , jsonpSender = require('./sender/jsonp')
      ;

    function JsonPTransport(transUrl) {
      if (!JsonPTransport.enabled()) {
        throw new Error('Transport created when disabled');
      }
      SenderReceiver.call(this, transUrl, '/jsonp', jsonpSender, JsonpReceiver);
    }

    inherits(JsonPTransport, SenderReceiver);

    JsonPTransport.enabled = function() {
      return !!global.document;
    };

    JsonPTransport.transportName = 'jsonp-polling';
    JsonPTransport.roundTrips = 1;
    JsonPTransport.needBody = true;

    module.exports = JsonPTransport;

    }).call(this,typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

    },{"./lib/sender-receiver":28,"./receiver/jsonp":31,"./sender/jsonp":33,"inherits":57}],24:[function(require,module,exports){
    (function (process){

    var inherits = require('inherits')
      , urlUtils = require('../../utils/url')
      , SenderReceiver = require('./sender-receiver')
      ;

    var debug = function() {};
    if (process.env.NODE_ENV !== 'production') {
      debug = require('debug')('sockjs-client:ajax-based');
    }

    function createAjaxSender(AjaxObject) {
      return function(url, payload, callback) {
        debug('create ajax sender', url, payload);
        var opt = {};
        if (typeof payload === 'string') {
          opt.headers = {'Content-type': 'text/plain'};
        }
        var ajaxUrl = urlUtils.addPath(url, '/xhr_send');
        var xo = new AjaxObject('POST', ajaxUrl, payload, opt);
        xo.once('finish', function(status) {
          debug('finish', status);
          xo = null;

          if (status !== 200 && status !== 204) {
            return callback(new Error('http status ' + status));
          }
          callback();
        });
        return function() {
          debug('abort');
          xo.close();
          xo = null;

          var err = new Error('Aborted');
          err.code = 1000;
          callback(err);
        };
      };
    }

    function AjaxBasedTransport(transUrl, urlSuffix, Receiver, AjaxObject) {
      SenderReceiver.call(this, transUrl, urlSuffix, createAjaxSender(AjaxObject), Receiver, AjaxObject);
    }

    inherits(AjaxBasedTransport, SenderReceiver);

    module.exports = AjaxBasedTransport;

    }).call(this,{ env: {} });

    },{"../../utils/url":52,"./sender-receiver":28,"debug":55,"inherits":57}],25:[function(require,module,exports){
    (function (process){

    var inherits = require('inherits')
      , EventEmitter = require('events').EventEmitter
      ;

    var debug = function() {};
    if (process.env.NODE_ENV !== 'production') {
      debug = require('debug')('sockjs-client:buffered-sender');
    }

    function BufferedSender(url, sender) {
      debug(url);
      EventEmitter.call(this);
      this.sendBuffer = [];
      this.sender = sender;
      this.url = url;
    }

    inherits(BufferedSender, EventEmitter);

    BufferedSender.prototype.send = function(message) {
      debug('send', message);
      this.sendBuffer.push(message);
      if (!this.sendStop) {
        this.sendSchedule();
      }
    };

    // For polling transports in a situation when in the message callback,
    // new message is being send. If the sending connection was started
    // before receiving one, it is possible to saturate the network and
    // timeout due to the lack of receiving socket. To avoid that we delay
    // sending messages by some small time, in order to let receiving
    // connection be started beforehand. This is only a halfmeasure and
    // does not fix the big problem, but it does make the tests go more
    // stable on slow networks.
    BufferedSender.prototype.sendScheduleWait = function() {
      debug('sendScheduleWait');
      var self = this;
      var tref;
      this.sendStop = function() {
        debug('sendStop');
        self.sendStop = null;
        clearTimeout(tref);
      };
      tref = setTimeout(function() {
        debug('timeout');
        self.sendStop = null;
        self.sendSchedule();
      }, 25);
    };

    BufferedSender.prototype.sendSchedule = function() {
      debug('sendSchedule', this.sendBuffer.length);
      var self = this;
      if (this.sendBuffer.length > 0) {
        var payload = '[' + this.sendBuffer.join(',') + ']';
        this.sendStop = this.sender(this.url, payload, function(err) {
          self.sendStop = null;
          if (err) {
            debug('error', err);
            self.emit('close', err.code || 1006, 'Sending error: ' + err);
            self.close();
          } else {
            self.sendScheduleWait();
          }
        });
        this.sendBuffer = [];
      }
    };

    BufferedSender.prototype._cleanup = function() {
      debug('_cleanup');
      this.removeAllListeners();
    };

    BufferedSender.prototype.close = function() {
      debug('close');
      this._cleanup();
      if (this.sendStop) {
        this.sendStop();
        this.sendStop = null;
      }
    };

    module.exports = BufferedSender;

    }).call(this,{ env: {} });

    },{"debug":55,"events":3,"inherits":57}],26:[function(require,module,exports){
    (function (global){

    var inherits = require('inherits')
      , IframeTransport = require('../iframe')
      , objectUtils = require('../../utils/object')
      ;

    module.exports = function(transport) {

      function IframeWrapTransport(transUrl, baseUrl) {
        IframeTransport.call(this, transport.transportName, transUrl, baseUrl);
      }

      inherits(IframeWrapTransport, IframeTransport);

      IframeWrapTransport.enabled = function(url, info) {
        if (!global.document) {
          return false;
        }

        var iframeInfo = objectUtils.extend({}, info);
        iframeInfo.sameOrigin = true;
        return transport.enabled(iframeInfo) && IframeTransport.enabled();
      };

      IframeWrapTransport.transportName = 'iframe-' + transport.transportName;
      IframeWrapTransport.needBody = true;
      IframeWrapTransport.roundTrips = IframeTransport.roundTrips + transport.roundTrips - 1; // html, javascript (2) + transport - no CORS (1)

      IframeWrapTransport.facadeTransport = transport;

      return IframeWrapTransport;
    };

    }).call(this,typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

    },{"../../utils/object":49,"../iframe":22,"inherits":57}],27:[function(require,module,exports){
    (function (process){

    var inherits = require('inherits')
      , EventEmitter = require('events').EventEmitter
      ;

    var debug = function() {};
    if (process.env.NODE_ENV !== 'production') {
      debug = require('debug')('sockjs-client:polling');
    }

    function Polling(Receiver, receiveUrl, AjaxObject) {
      debug(receiveUrl);
      EventEmitter.call(this);
      this.Receiver = Receiver;
      this.receiveUrl = receiveUrl;
      this.AjaxObject = AjaxObject;
      this._scheduleReceiver();
    }

    inherits(Polling, EventEmitter);

    Polling.prototype._scheduleReceiver = function() {
      debug('_scheduleReceiver');
      var self = this;
      var poll = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);

      poll.on('message', function(msg) {
        debug('message', msg);
        self.emit('message', msg);
      });

      poll.once('close', function(code, reason) {
        debug('close', code, reason, self.pollIsClosing);
        self.poll = poll = null;

        if (!self.pollIsClosing) {
          if (reason === 'network') {
            self._scheduleReceiver();
          } else {
            self.emit('close', code || 1006, reason);
            self.removeAllListeners();
          }
        }
      });
    };

    Polling.prototype.abort = function() {
      debug('abort');
      this.removeAllListeners();
      this.pollIsClosing = true;
      if (this.poll) {
        this.poll.abort();
      }
    };

    module.exports = Polling;

    }).call(this,{ env: {} });

    },{"debug":55,"events":3,"inherits":57}],28:[function(require,module,exports){
    (function (process){

    var inherits = require('inherits')
      , urlUtils = require('../../utils/url')
      , BufferedSender = require('./buffered-sender')
      , Polling = require('./polling')
      ;

    var debug = function() {};
    if (process.env.NODE_ENV !== 'production') {
      debug = require('debug')('sockjs-client:sender-receiver');
    }

    function SenderReceiver(transUrl, urlSuffix, senderFunc, Receiver, AjaxObject) {
      var pollUrl = urlUtils.addPath(transUrl, urlSuffix);
      debug(pollUrl);
      var self = this;
      BufferedSender.call(this, transUrl, senderFunc);

      this.poll = new Polling(Receiver, pollUrl, AjaxObject);
      this.poll.on('message', function(msg) {
        debug('poll message', msg);
        self.emit('message', msg);
      });
      this.poll.once('close', function(code, reason) {
        debug('poll close', code, reason);
        self.poll = null;
        self.emit('close', code, reason);
        self.close();
      });
    }

    inherits(SenderReceiver, BufferedSender);

    SenderReceiver.prototype.close = function() {
      BufferedSender.prototype.close.call(this);
      debug('close');
      this.removeAllListeners();
      if (this.poll) {
        this.poll.abort();
        this.poll = null;
      }
    };

    module.exports = SenderReceiver;

    }).call(this,{ env: {} });

    },{"../../utils/url":52,"./buffered-sender":25,"./polling":27,"debug":55,"inherits":57}],29:[function(require,module,exports){
    (function (process){

    var inherits = require('inherits')
      , EventEmitter = require('events').EventEmitter
      , EventSourceDriver = require('eventsource')
      ;

    var debug = function() {};
    if (process.env.NODE_ENV !== 'production') {
      debug = require('debug')('sockjs-client:receiver:eventsource');
    }

    function EventSourceReceiver(url) {
      debug(url);
      EventEmitter.call(this);

      var self = this;
      var es = this.es = new EventSourceDriver(url);
      es.onmessage = function(e) {
        debug('message', e.data);
        self.emit('message', decodeURI(e.data));
      };
      es.onerror = function(e) {
        debug('error', es.readyState, e);
        // ES on reconnection has readyState = 0 or 1.
        // on network error it's CLOSED = 2
        var reason = (es.readyState !== 2 ? 'network' : 'permanent');
        self._cleanup();
        self._close(reason);
      };
    }

    inherits(EventSourceReceiver, EventEmitter);

    EventSourceReceiver.prototype.abort = function() {
      debug('abort');
      this._cleanup();
      this._close('user');
    };

    EventSourceReceiver.prototype._cleanup = function() {
      debug('cleanup');
      var es = this.es;
      if (es) {
        es.onmessage = es.onerror = null;
        es.close();
        this.es = null;
      }
    };

    EventSourceReceiver.prototype._close = function(reason) {
      debug('close', reason);
      var self = this;
      // Safari and chrome < 15 crash if we close window before
      // waiting for ES cleanup. See:
      // https://code.google.com/p/chromium/issues/detail?id=89155
      setTimeout(function() {
        self.emit('close', null, reason);
        self.removeAllListeners();
      }, 200);
    };

    module.exports = EventSourceReceiver;

    }).call(this,{ env: {} });

    },{"debug":55,"events":3,"eventsource":18,"inherits":57}],30:[function(require,module,exports){
    (function (process,global){

    var inherits = require('inherits')
      , iframeUtils = require('../../utils/iframe')
      , urlUtils = require('../../utils/url')
      , EventEmitter = require('events').EventEmitter
      , random = require('../../utils/random')
      ;

    var debug = function() {};
    if (process.env.NODE_ENV !== 'production') {
      debug = require('debug')('sockjs-client:receiver:htmlfile');
    }

    function HtmlfileReceiver(url) {
      debug(url);
      EventEmitter.call(this);
      var self = this;
      iframeUtils.polluteGlobalNamespace();

      this.id = 'a' + random.string(6);
      url = urlUtils.addQuery(url, 'c=' + decodeURIComponent(iframeUtils.WPrefix + '.' + this.id));

      debug('using htmlfile', HtmlfileReceiver.htmlfileEnabled);
      var constructFunc = HtmlfileReceiver.htmlfileEnabled ?
          iframeUtils.createHtmlfile : iframeUtils.createIframe;

      global[iframeUtils.WPrefix][this.id] = {
        start: function() {
          debug('start');
          self.iframeObj.loaded();
        }
      , message: function(data) {
          debug('message', data);
          self.emit('message', data);
        }
      , stop: function() {
          debug('stop');
          self._cleanup();
          self._close('network');
        }
      };
      this.iframeObj = constructFunc(url, function() {
        debug('callback');
        self._cleanup();
        self._close('permanent');
      });
    }

    inherits(HtmlfileReceiver, EventEmitter);

    HtmlfileReceiver.prototype.abort = function() {
      debug('abort');
      this._cleanup();
      this._close('user');
    };

    HtmlfileReceiver.prototype._cleanup = function() {
      debug('_cleanup');
      if (this.iframeObj) {
        this.iframeObj.cleanup();
        this.iframeObj = null;
      }
      delete global[iframeUtils.WPrefix][this.id];
    };

    HtmlfileReceiver.prototype._close = function(reason) {
      debug('_close', reason);
      this.emit('close', null, reason);
      this.removeAllListeners();
    };

    HtmlfileReceiver.htmlfileEnabled = false;

    // obfuscate to avoid firewalls
    var axo = ['Active'].concat('Object').join('X');
    if (axo in global) {
      try {
        HtmlfileReceiver.htmlfileEnabled = !!new global[axo]('htmlfile');
      } catch (x) {
        // intentionally empty
      }
    }

    HtmlfileReceiver.enabled = HtmlfileReceiver.htmlfileEnabled || iframeUtils.iframeEnabled;

    module.exports = HtmlfileReceiver;

    }).call(this,{ env: {} },typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

    },{"../../utils/iframe":47,"../../utils/random":50,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],31:[function(require,module,exports){
    (function (process,global){

    var utils = require('../../utils/iframe')
      , random = require('../../utils/random')
      , browser = require('../../utils/browser')
      , urlUtils = require('../../utils/url')
      , inherits = require('inherits')
      , EventEmitter = require('events').EventEmitter
      ;

    var debug = function() {};
    if (process.env.NODE_ENV !== 'production') {
      debug = require('debug')('sockjs-client:receiver:jsonp');
    }

    function JsonpReceiver(url) {
      debug(url);
      var self = this;
      EventEmitter.call(this);

      utils.polluteGlobalNamespace();

      this.id = 'a' + random.string(6);
      var urlWithId = urlUtils.addQuery(url, 'c=' + encodeURIComponent(utils.WPrefix + '.' + this.id));

      global[utils.WPrefix][this.id] = this._callback.bind(this);
      this._createScript(urlWithId);

      // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.
      this.timeoutId = setTimeout(function() {
        debug('timeout');
        self._abort(new Error('JSONP script loaded abnormally (timeout)'));
      }, JsonpReceiver.timeout);
    }

    inherits(JsonpReceiver, EventEmitter);

    JsonpReceiver.prototype.abort = function() {
      debug('abort');
      if (global[utils.WPrefix][this.id]) {
        var err = new Error('JSONP user aborted read');
        err.code = 1000;
        this._abort(err);
      }
    };

    JsonpReceiver.timeout = 35000;
    JsonpReceiver.scriptErrorTimeout = 1000;

    JsonpReceiver.prototype._callback = function(data) {
      debug('_callback', data);
      this._cleanup();

      if (this.aborting) {
        return;
      }

      if (data) {
        debug('message', data);
        this.emit('message', data);
      }
      this.emit('close', null, 'network');
      this.removeAllListeners();
    };

    JsonpReceiver.prototype._abort = function(err) {
      debug('_abort', err);
      this._cleanup();
      this.aborting = true;
      this.emit('close', err.code, err.message);
      this.removeAllListeners();
    };

    JsonpReceiver.prototype._cleanup = function() {
      debug('_cleanup');
      clearTimeout(this.timeoutId);
      if (this.script2) {
        this.script2.parentNode.removeChild(this.script2);
        this.script2 = null;
      }
      if (this.script) {
        var script = this.script;
        // Unfortunately, you can't really abort script loading of
        // the script.
        script.parentNode.removeChild(script);
        script.onreadystatechange = script.onerror =
            script.onload = script.onclick = null;
        this.script = null;
      }
      delete global[utils.WPrefix][this.id];
    };

    JsonpReceiver.prototype._scriptError = function() {
      debug('_scriptError');
      var self = this;
      if (this.errorTimer) {
        return;
      }

      this.errorTimer = setTimeout(function() {
        if (!self.loadedOkay) {
          self._abort(new Error('JSONP script loaded abnormally (onerror)'));
        }
      }, JsonpReceiver.scriptErrorTimeout);
    };

    JsonpReceiver.prototype._createScript = function(url) {
      debug('_createScript', url);
      var self = this;
      var script = this.script = global.document.createElement('script');
      var script2;  // Opera synchronous load trick.

      script.id = 'a' + random.string(8);
      script.src = url;
      script.type = 'text/javascript';
      script.charset = 'UTF-8';
      script.onerror = this._scriptError.bind(this);
      script.onload = function() {
        debug('onload');
        self._abort(new Error('JSONP script loaded abnormally (onload)'));
      };

      // IE9 fires 'error' event after onreadystatechange or before, in random order.
      // Use loadedOkay to determine if actually errored
      script.onreadystatechange = function() {
        debug('onreadystatechange', script.readyState);
        if (/loaded|closed/.test(script.readyState)) {
          if (script && script.htmlFor && script.onclick) {
            self.loadedOkay = true;
            try {
              // In IE, actually execute the script.
              script.onclick();
            } catch (x) {
              // intentionally empty
            }
          }
          if (script) {
            self._abort(new Error('JSONP script loaded abnormally (onreadystatechange)'));
          }
        }
      };
      // IE: event/htmlFor/onclick trick.
      // One can't rely on proper order for onreadystatechange. In order to
      // make sure, set a 'htmlFor' and 'event' properties, so that
      // script code will be installed as 'onclick' handler for the
      // script object. Later, onreadystatechange, manually execute this
      // code. FF and Chrome doesn't work with 'event' and 'htmlFor'
      // set. For reference see:
      //   http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
      // Also, read on that about script ordering:
      //   http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
      if (typeof script.async === 'undefined' && global.document.attachEvent) {
        // According to mozilla docs, in recent browsers script.async defaults
        // to 'true', so we may use it to detect a good browser:
        // https://developer.mozilla.org/en/HTML/Element/script
        if (!browser.isOpera()) {
          // Naively assume we're in IE
          try {
            script.htmlFor = script.id;
            script.event = 'onclick';
          } catch (x) {
            // intentionally empty
          }
          script.async = true;
        } else {
          // Opera, second sync script hack
          script2 = this.script2 = global.document.createElement('script');
          script2.text = "try{var a = document.getElementById('" + script.id + "'); if(a)a.onerror();}catch(x){};";
          script.async = script2.async = false;
        }
      }
      if (typeof script.async !== 'undefined') {
        script.async = true;
      }

      var head = global.document.getElementsByTagName('head')[0];
      head.insertBefore(script, head.firstChild);
      if (script2) {
        head.insertBefore(script2, head.firstChild);
      }
    };

    module.exports = JsonpReceiver;

    }).call(this,{ env: {} },typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

    },{"../../utils/browser":44,"../../utils/iframe":47,"../../utils/random":50,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],32:[function(require,module,exports){
    (function (process){

    var inherits = require('inherits')
      , EventEmitter = require('events').EventEmitter
      ;

    var debug = function() {};
    if (process.env.NODE_ENV !== 'production') {
      debug = require('debug')('sockjs-client:receiver:xhr');
    }

    function XhrReceiver(url, AjaxObject) {
      debug(url);
      EventEmitter.call(this);
      var self = this;

      this.bufferPosition = 0;

      this.xo = new AjaxObject('POST', url, null);
      this.xo.on('chunk', this._chunkHandler.bind(this));
      this.xo.once('finish', function(status, text) {
        debug('finish', status, text);
        self._chunkHandler(status, text);
        self.xo = null;
        var reason = status === 200 ? 'network' : 'permanent';
        debug('close', reason);
        self.emit('close', null, reason);
        self._cleanup();
      });
    }

    inherits(XhrReceiver, EventEmitter);

    XhrReceiver.prototype._chunkHandler = function(status, text) {
      debug('_chunkHandler', status);
      if (status !== 200 || !text) {
        return;
      }

      for (var idx = -1; ; this.bufferPosition += idx + 1) {
        var buf = text.slice(this.bufferPosition);
        idx = buf.indexOf('\n');
        if (idx === -1) {
          break;
        }
        var msg = buf.slice(0, idx);
        if (msg) {
          debug('message', msg);
          this.emit('message', msg);
        }
      }
    };

    XhrReceiver.prototype._cleanup = function() {
      debug('_cleanup');
      this.removeAllListeners();
    };

    XhrReceiver.prototype.abort = function() {
      debug('abort');
      if (this.xo) {
        this.xo.close();
        debug('close');
        this.emit('close', null, 'user');
        this.xo = null;
      }
      this._cleanup();
    };

    module.exports = XhrReceiver;

    }).call(this,{ env: {} });

    },{"debug":55,"events":3,"inherits":57}],33:[function(require,module,exports){
    (function (process,global){

    var random = require('../../utils/random')
      , urlUtils = require('../../utils/url')
      ;

    var debug = function() {};
    if (process.env.NODE_ENV !== 'production') {
      debug = require('debug')('sockjs-client:sender:jsonp');
    }

    var form, area;

    function createIframe(id) {
      debug('createIframe', id);
      try {
        // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
        return global.document.createElement('<iframe name="' + id + '">');
      } catch (x) {
        var iframe = global.document.createElement('iframe');
        iframe.name = id;
        return iframe;
      }
    }

    function createForm() {
      debug('createForm');
      form = global.document.createElement('form');
      form.style.display = 'none';
      form.style.position = 'absolute';
      form.method = 'POST';
      form.enctype = 'application/x-www-form-urlencoded';
      form.acceptCharset = 'UTF-8';

      area = global.document.createElement('textarea');
      area.name = 'd';
      form.appendChild(area);

      global.document.body.appendChild(form);
    }

    module.exports = function(url, payload, callback) {
      debug(url, payload);
      if (!form) {
        createForm();
      }
      var id = 'a' + random.string(8);
      form.target = id;
      form.action = urlUtils.addQuery(urlUtils.addPath(url, '/jsonp_send'), 'i=' + id);

      var iframe = createIframe(id);
      iframe.id = id;
      iframe.style.display = 'none';
      form.appendChild(iframe);

      try {
        area.value = payload;
      } catch (e) {
        // seriously broken browsers get here
      }
      form.submit();

      var completed = function(err) {
        debug('completed', id, err);
        if (!iframe.onerror) {
          return;
        }
        iframe.onreadystatechange = iframe.onerror = iframe.onload = null;
        // Opera mini doesn't like if we GC iframe
        // immediately, thus this timeout.
        setTimeout(function() {
          debug('cleaning up', id);
          iframe.parentNode.removeChild(iframe);
          iframe = null;
        }, 500);
        area.value = '';
        // It is not possible to detect if the iframe succeeded or
        // failed to submit our form.
        callback(err);
      };
      iframe.onerror = function() {
        debug('onerror', id);
        completed();
      };
      iframe.onload = function() {
        debug('onload', id);
        completed();
      };
      iframe.onreadystatechange = function(e) {
        debug('onreadystatechange', id, iframe.readyState, e);
        if (iframe.readyState === 'complete') {
          completed();
        }
      };
      return function() {
        debug('aborted', id);
        completed(new Error('Aborted'));
      };
    };

    }).call(this,{ env: {} },typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

    },{"../../utils/random":50,"../../utils/url":52,"debug":55}],34:[function(require,module,exports){
    (function (process,global){

    var EventEmitter = require('events').EventEmitter
      , inherits = require('inherits')
      , eventUtils = require('../../utils/event')
      , browser = require('../../utils/browser')
      , urlUtils = require('../../utils/url')
      ;

    var debug = function() {};
    if (process.env.NODE_ENV !== 'production') {
      debug = require('debug')('sockjs-client:sender:xdr');
    }

    // References:
    //   http://ajaxian.com/archives/100-line-ajax-wrapper
    //   http://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx

    function XDRObject(method, url, payload) {
      debug(method, url);
      var self = this;
      EventEmitter.call(this);

      setTimeout(function() {
        self._start(method, url, payload);
      }, 0);
    }

    inherits(XDRObject, EventEmitter);

    XDRObject.prototype._start = function(method, url, payload) {
      debug('_start');
      var self = this;
      var xdr = new global.XDomainRequest();
      // IE caches even POSTs
      url = urlUtils.addQuery(url, 't=' + (+new Date()));

      xdr.onerror = function() {
        debug('onerror');
        self._error();
      };
      xdr.ontimeout = function() {
        debug('ontimeout');
        self._error();
      };
      xdr.onprogress = function() {
        debug('progress', xdr.responseText);
        self.emit('chunk', 200, xdr.responseText);
      };
      xdr.onload = function() {
        debug('load');
        self.emit('finish', 200, xdr.responseText);
        self._cleanup(false);
      };
      this.xdr = xdr;
      this.unloadRef = eventUtils.unloadAdd(function() {
        self._cleanup(true);
      });
      try {
        // Fails with AccessDenied if port number is bogus
        this.xdr.open(method, url);
        if (this.timeout) {
          this.xdr.timeout = this.timeout;
        }
        this.xdr.send(payload);
      } catch (x) {
        this._error();
      }
    };

    XDRObject.prototype._error = function() {
      this.emit('finish', 0, '');
      this._cleanup(false);
    };

    XDRObject.prototype._cleanup = function(abort) {
      debug('cleanup', abort);
      if (!this.xdr) {
        return;
      }
      this.removeAllListeners();
      eventUtils.unloadDel(this.unloadRef);

      this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null;
      if (abort) {
        try {
          this.xdr.abort();
        } catch (x) {
          // intentionally empty
        }
      }
      this.unloadRef = this.xdr = null;
    };

    XDRObject.prototype.close = function() {
      debug('close');
      this._cleanup(true);
    };

    // IE 8/9 if the request target uses the same scheme - #79
    XDRObject.enabled = !!(global.XDomainRequest && browser.hasDomain());

    module.exports = XDRObject;

    }).call(this,{ env: {} },typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

    },{"../../utils/browser":44,"../../utils/event":46,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],35:[function(require,module,exports){

    var inherits = require('inherits')
      , XhrDriver = require('../driver/xhr')
      ;

    function XHRCorsObject(method, url, payload, opts) {
      XhrDriver.call(this, method, url, payload, opts);
    }

    inherits(XHRCorsObject, XhrDriver);

    XHRCorsObject.enabled = XhrDriver.enabled && XhrDriver.supportsCORS;

    module.exports = XHRCorsObject;

    },{"../driver/xhr":17,"inherits":57}],36:[function(require,module,exports){

    var EventEmitter = require('events').EventEmitter
      , inherits = require('inherits')
      ;

    function XHRFake(/* method, url, payload, opts */) {
      var self = this;
      EventEmitter.call(this);

      this.to = setTimeout(function() {
        self.emit('finish', 200, '{}');
      }, XHRFake.timeout);
    }

    inherits(XHRFake, EventEmitter);

    XHRFake.prototype.close = function() {
      clearTimeout(this.to);
    };

    XHRFake.timeout = 2000;

    module.exports = XHRFake;

    },{"events":3,"inherits":57}],37:[function(require,module,exports){

    var inherits = require('inherits')
      , XhrDriver = require('../driver/xhr')
      ;

    function XHRLocalObject(method, url, payload /*, opts */) {
      XhrDriver.call(this, method, url, payload, {
        noCredentials: true
      });
    }

    inherits(XHRLocalObject, XhrDriver);

    XHRLocalObject.enabled = XhrDriver.enabled;

    module.exports = XHRLocalObject;

    },{"../driver/xhr":17,"inherits":57}],38:[function(require,module,exports){
    (function (process){

    var utils = require('../utils/event')
      , urlUtils = require('../utils/url')
      , inherits = require('inherits')
      , EventEmitter = require('events').EventEmitter
      , WebsocketDriver = require('./driver/websocket')
      ;

    var debug = function() {};
    if (process.env.NODE_ENV !== 'production') {
      debug = require('debug')('sockjs-client:websocket');
    }

    function WebSocketTransport(transUrl, ignore, options) {
      if (!WebSocketTransport.enabled()) {
        throw new Error('Transport created when disabled');
      }

      EventEmitter.call(this);
      debug('constructor', transUrl);

      var self = this;
      var url = urlUtils.addPath(transUrl, '/websocket');
      if (url.slice(0, 5) === 'https') {
        url = 'wss' + url.slice(5);
      } else {
        url = 'ws' + url.slice(4);
      }
      this.url = url;

      this.ws = new WebsocketDriver(this.url, [], options);
      this.ws.onmessage = function(e) {
        debug('message event', e.data);
        self.emit('message', e.data);
      };
      // Firefox has an interesting bug. If a websocket connection is
      // created after onunload, it stays alive even when user
      // navigates away from the page. In such situation let's lie -
      // let's not open the ws connection at all. See:
      // https://github.com/sockjs/sockjs-client/issues/28
      // https://bugzilla.mozilla.org/show_bug.cgi?id=696085
      this.unloadRef = utils.unloadAdd(function() {
        debug('unload');
        self.ws.close();
      });
      this.ws.onclose = function(e) {
        debug('close event', e.code, e.reason);
        self.emit('close', e.code, e.reason);
        self._cleanup();
      };
      this.ws.onerror = function(e) {
        debug('error event', e);
        self.emit('close', 1006, 'WebSocket connection broken');
        self._cleanup();
      };
    }

    inherits(WebSocketTransport, EventEmitter);

    WebSocketTransport.prototype.send = function(data) {
      var msg = '[' + data + ']';
      debug('send', msg);
      this.ws.send(msg);
    };

    WebSocketTransport.prototype.close = function() {
      debug('close');
      var ws = this.ws;
      this._cleanup();
      if (ws) {
        ws.close();
      }
    };

    WebSocketTransport.prototype._cleanup = function() {
      debug('_cleanup');
      var ws = this.ws;
      if (ws) {
        ws.onmessage = ws.onclose = ws.onerror = null;
      }
      utils.unloadDel(this.unloadRef);
      this.unloadRef = this.ws = null;
      this.removeAllListeners();
    };

    WebSocketTransport.enabled = function() {
      debug('enabled');
      return !!WebsocketDriver;
    };
    WebSocketTransport.transportName = 'websocket';

    // In theory, ws should require 1 round trip. But in chrome, this is
    // not very stable over SSL. Most likely a ws connection requires a
    // separate SSL connection, in which case 2 round trips are an
    // absolute minumum.
    WebSocketTransport.roundTrips = 2;

    module.exports = WebSocketTransport;

    }).call(this,{ env: {} });

    },{"../utils/event":46,"../utils/url":52,"./driver/websocket":19,"debug":55,"events":3,"inherits":57}],39:[function(require,module,exports){

    var inherits = require('inherits')
      , AjaxBasedTransport = require('./lib/ajax-based')
      , XdrStreamingTransport = require('./xdr-streaming')
      , XhrReceiver = require('./receiver/xhr')
      , XDRObject = require('./sender/xdr')
      ;

    function XdrPollingTransport(transUrl) {
      if (!XDRObject.enabled) {
        throw new Error('Transport created when disabled');
      }
      AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XDRObject);
    }

    inherits(XdrPollingTransport, AjaxBasedTransport);

    XdrPollingTransport.enabled = XdrStreamingTransport.enabled;
    XdrPollingTransport.transportName = 'xdr-polling';
    XdrPollingTransport.roundTrips = 2; // preflight, ajax

    module.exports = XdrPollingTransport;

    },{"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xdr":34,"./xdr-streaming":40,"inherits":57}],40:[function(require,module,exports){

    var inherits = require('inherits')
      , AjaxBasedTransport = require('./lib/ajax-based')
      , XhrReceiver = require('./receiver/xhr')
      , XDRObject = require('./sender/xdr')
      ;

    // According to:
    //   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
    //   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/

    function XdrStreamingTransport(transUrl) {
      if (!XDRObject.enabled) {
        throw new Error('Transport created when disabled');
      }
      AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XDRObject);
    }

    inherits(XdrStreamingTransport, AjaxBasedTransport);

    XdrStreamingTransport.enabled = function(info) {
      if (info.cookie_needed || info.nullOrigin) {
        return false;
      }
      return XDRObject.enabled && info.sameScheme;
    };

    XdrStreamingTransport.transportName = 'xdr-streaming';
    XdrStreamingTransport.roundTrips = 2; // preflight, ajax

    module.exports = XdrStreamingTransport;

    },{"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xdr":34,"inherits":57}],41:[function(require,module,exports){

    var inherits = require('inherits')
      , AjaxBasedTransport = require('./lib/ajax-based')
      , XhrReceiver = require('./receiver/xhr')
      , XHRCorsObject = require('./sender/xhr-cors')
      , XHRLocalObject = require('./sender/xhr-local')
      ;

    function XhrPollingTransport(transUrl) {
      if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
        throw new Error('Transport created when disabled');
      }
      AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XHRCorsObject);
    }

    inherits(XhrPollingTransport, AjaxBasedTransport);

    XhrPollingTransport.enabled = function(info) {
      if (info.nullOrigin) {
        return false;
      }

      if (XHRLocalObject.enabled && info.sameOrigin) {
        return true;
      }
      return XHRCorsObject.enabled;
    };

    XhrPollingTransport.transportName = 'xhr-polling';
    XhrPollingTransport.roundTrips = 2; // preflight, ajax

    module.exports = XhrPollingTransport;

    },{"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xhr-cors":35,"./sender/xhr-local":37,"inherits":57}],42:[function(require,module,exports){
    (function (global){

    var inherits = require('inherits')
      , AjaxBasedTransport = require('./lib/ajax-based')
      , XhrReceiver = require('./receiver/xhr')
      , XHRCorsObject = require('./sender/xhr-cors')
      , XHRLocalObject = require('./sender/xhr-local')
      , browser = require('../utils/browser')
      ;

    function XhrStreamingTransport(transUrl) {
      if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
        throw new Error('Transport created when disabled');
      }
      AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XHRCorsObject);
    }

    inherits(XhrStreamingTransport, AjaxBasedTransport);

    XhrStreamingTransport.enabled = function(info) {
      if (info.nullOrigin) {
        return false;
      }
      // Opera doesn't support xhr-streaming #60
      // But it might be able to #92
      if (browser.isOpera()) {
        return false;
      }

      return XHRCorsObject.enabled;
    };

    XhrStreamingTransport.transportName = 'xhr-streaming';
    XhrStreamingTransport.roundTrips = 2; // preflight, ajax

    // Safari gets confused when a streaming ajax request is started
    // before onload. This causes the load indicator to spin indefinetely.
    // Only require body when used in a browser
    XhrStreamingTransport.needBody = !!global.document;

    module.exports = XhrStreamingTransport;

    }).call(this,typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

    },{"../utils/browser":44,"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xhr-cors":35,"./sender/xhr-local":37,"inherits":57}],43:[function(require,module,exports){
    (function (global){

    if (global.crypto && global.crypto.getRandomValues) {
      module.exports.randomBytes = function(length) {
        var bytes = new Uint8Array(length);
        global.crypto.getRandomValues(bytes);
        return bytes;
      };
    } else {
      module.exports.randomBytes = function(length) {
        var bytes = new Array(length);
        for (var i = 0; i < length; i++) {
          bytes[i] = Math.floor(Math.random() * 256);
        }
        return bytes;
      };
    }

    }).call(this,typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

    },{}],44:[function(require,module,exports){
    (function (global){

    module.exports = {
      isOpera: function() {
        return global.navigator &&
          /opera/i.test(global.navigator.userAgent);
      }

    , isKonqueror: function() {
        return global.navigator &&
          /konqueror/i.test(global.navigator.userAgent);
      }

      // #187 wrap document.domain in try/catch because of WP8 from file:///
    , hasDomain: function () {
        // non-browser client always has a domain
        if (!global.document) {
          return true;
        }

        try {
          return !!global.document.domain;
        } catch (e) {
          return false;
        }
      }
    };

    }).call(this,typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

    },{}],45:[function(require,module,exports){

    var JSON3 = require('json3');

    // Some extra characters that Chrome gets wrong, and substitutes with
    // something else on the wire.
    // eslint-disable-next-line no-control-regex, no-misleading-character-class
    var extraEscapable = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g
      , extraLookup;

    // This may be quite slow, so let's delay until user actually uses bad
    // characters.
    var unrollLookup = function(escapable) {
      var i;
      var unrolled = {};
      var c = [];
      for (i = 0; i < 65536; i++) {
        c.push( String.fromCharCode(i) );
      }
      escapable.lastIndex = 0;
      c.join('').replace(escapable, function(a) {
        unrolled[ a ] = '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        return '';
      });
      escapable.lastIndex = 0;
      return unrolled;
    };

    // Quote string, also taking care of unicode characters that browsers
    // often break. Especially, take care of unicode surrogates:
    // http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates
    module.exports = {
      quote: function(string) {
        var quoted = JSON3.stringify(string);

        // In most cases this should be very fast and good enough.
        extraEscapable.lastIndex = 0;
        if (!extraEscapable.test(quoted)) {
          return quoted;
        }

        if (!extraLookup) {
          extraLookup = unrollLookup(extraEscapable);
        }

        return quoted.replace(extraEscapable, function(a) {
          return extraLookup[a];
        });
      }
    };

    },{"json3":58}],46:[function(require,module,exports){
    (function (global){

    var random = require('./random');

    var onUnload = {}
      , afterUnload = false
        // detect google chrome packaged apps because they don't allow the 'unload' event
      , isChromePackagedApp = global.chrome && global.chrome.app && global.chrome.app.runtime
      ;

    module.exports = {
      attachEvent: function(event, listener) {
        if (typeof global.addEventListener !== 'undefined') {
          global.addEventListener(event, listener, false);
        } else if (global.document && global.attachEvent) {
          // IE quirks.
          // According to: http://stevesouders.com/misc/test-postmessage.php
          // the message gets delivered only to 'document', not 'window'.
          global.document.attachEvent('on' + event, listener);
          // I get 'window' for ie8.
          global.attachEvent('on' + event, listener);
        }
      }

    , detachEvent: function(event, listener) {
        if (typeof global.addEventListener !== 'undefined') {
          global.removeEventListener(event, listener, false);
        } else if (global.document && global.detachEvent) {
          global.document.detachEvent('on' + event, listener);
          global.detachEvent('on' + event, listener);
        }
      }

    , unloadAdd: function(listener) {
        if (isChromePackagedApp) {
          return null;
        }

        var ref = random.string(8);
        onUnload[ref] = listener;
        if (afterUnload) {
          setTimeout(this.triggerUnloadCallbacks, 0);
        }
        return ref;
      }

    , unloadDel: function(ref) {
        if (ref in onUnload) {
          delete onUnload[ref];
        }
      }

    , triggerUnloadCallbacks: function() {
        for (var ref in onUnload) {
          onUnload[ref]();
          delete onUnload[ref];
        }
      }
    };

    var unloadTriggered = function() {
      if (afterUnload) {
        return;
      }
      afterUnload = true;
      module.exports.triggerUnloadCallbacks();
    };

    // 'unload' alone is not reliable in opera within an iframe, but we
    // can't use `beforeunload` as IE fires it on javascript: links.
    if (!isChromePackagedApp) {
      module.exports.attachEvent('unload', unloadTriggered);
    }

    }).call(this,typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

    },{"./random":50}],47:[function(require,module,exports){
    (function (process,global){

    var eventUtils = require('./event')
      , JSON3 = require('json3')
      , browser = require('./browser')
      ;

    var debug = function() {};
    if (process.env.NODE_ENV !== 'production') {
      debug = require('debug')('sockjs-client:utils:iframe');
    }

    module.exports = {
      WPrefix: '_jp'
    , currentWindowId: null

    , polluteGlobalNamespace: function() {
        if (!(module.exports.WPrefix in global)) {
          global[module.exports.WPrefix] = {};
        }
      }

    , postMessage: function(type, data) {
        if (global.parent !== global) {
          global.parent.postMessage(JSON3.stringify({
            windowId: module.exports.currentWindowId
          , type: type
          , data: data || ''
          }), '*');
        } else {
          debug('Cannot postMessage, no parent window.', type, data);
        }
      }

    , createIframe: function(iframeUrl, errorCallback) {
        var iframe = global.document.createElement('iframe');
        var tref, unloadRef;
        var unattach = function() {
          debug('unattach');
          clearTimeout(tref);
          // Explorer had problems with that.
          try {
            iframe.onload = null;
          } catch (x) {
            // intentionally empty
          }
          iframe.onerror = null;
        };
        var cleanup = function() {
          debug('cleanup');
          if (iframe) {
            unattach();
            // This timeout makes chrome fire onbeforeunload event
            // within iframe. Without the timeout it goes straight to
            // onunload.
            setTimeout(function() {
              if (iframe) {
                iframe.parentNode.removeChild(iframe);
              }
              iframe = null;
            }, 0);
            eventUtils.unloadDel(unloadRef);
          }
        };
        var onerror = function(err) {
          debug('onerror', err);
          if (iframe) {
            cleanup();
            errorCallback(err);
          }
        };
        var post = function(msg, origin) {
          debug('post', msg, origin);
          setTimeout(function() {
            try {
              // When the iframe is not loaded, IE raises an exception
              // on 'contentWindow'.
              if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage(msg, origin);
              }
            } catch (x) {
              // intentionally empty
            }
          }, 0);
        };

        iframe.src = iframeUrl;
        iframe.style.display = 'none';
        iframe.style.position = 'absolute';
        iframe.onerror = function() {
          onerror('onerror');
        };
        iframe.onload = function() {
          debug('onload');
          // `onload` is triggered before scripts on the iframe are
          // executed. Give it few seconds to actually load stuff.
          clearTimeout(tref);
          tref = setTimeout(function() {
            onerror('onload timeout');
          }, 2000);
        };
        global.document.body.appendChild(iframe);
        tref = setTimeout(function() {
          onerror('timeout');
        }, 15000);
        unloadRef = eventUtils.unloadAdd(cleanup);
        return {
          post: post
        , cleanup: cleanup
        , loaded: unattach
        };
      }

    /* eslint no-undef: "off", new-cap: "off" */
    , createHtmlfile: function(iframeUrl, errorCallback) {
        var axo = ['Active'].concat('Object').join('X');
        var doc = new global[axo]('htmlfile');
        var tref, unloadRef;
        var iframe;
        var unattach = function() {
          clearTimeout(tref);
          iframe.onerror = null;
        };
        var cleanup = function() {
          if (doc) {
            unattach();
            eventUtils.unloadDel(unloadRef);
            iframe.parentNode.removeChild(iframe);
            iframe = doc = null;
            CollectGarbage();
          }
        };
        var onerror = function(r) {
          debug('onerror', r);
          if (doc) {
            cleanup();
            errorCallback(r);
          }
        };
        var post = function(msg, origin) {
          try {
            // When the iframe is not loaded, IE raises an exception
            // on 'contentWindow'.
            setTimeout(function() {
              if (iframe && iframe.contentWindow) {
                  iframe.contentWindow.postMessage(msg, origin);
              }
            }, 0);
          } catch (x) {
            // intentionally empty
          }
        };

        doc.open();
        doc.write('<html><s' + 'cript>' +
                  'document.domain="' + global.document.domain + '";' +
                  '</s' + 'cript></html>');
        doc.close();
        doc.parentWindow[module.exports.WPrefix] = global[module.exports.WPrefix];
        var c = doc.createElement('div');
        doc.body.appendChild(c);
        iframe = doc.createElement('iframe');
        c.appendChild(iframe);
        iframe.src = iframeUrl;
        iframe.onerror = function() {
          onerror('onerror');
        };
        tref = setTimeout(function() {
          onerror('timeout');
        }, 15000);
        unloadRef = eventUtils.unloadAdd(cleanup);
        return {
          post: post
        , cleanup: cleanup
        , loaded: unattach
        };
      }
    };

    module.exports.iframeEnabled = false;
    if (global.document) {
      // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
      // huge delay, or not at all.
      module.exports.iframeEnabled = (typeof global.postMessage === 'function' ||
        typeof global.postMessage === 'object') && (!browser.isKonqueror());
    }

    }).call(this,{ env: {} },typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

    },{"./browser":44,"./event":46,"debug":55,"json3":58}],48:[function(require,module,exports){
    (function (global){

    var logObject = {};
    ['log', 'debug', 'warn'].forEach(function (level) {
      var levelExists;

      try {
        levelExists = global.console && global.console[level] && global.console[level].apply;
      } catch(e) {
        // do nothing
      }

      logObject[level] = levelExists ? function () {
        return global.console[level].apply(global.console, arguments);
      } : (level === 'log' ? function () {} : logObject.log);
    });

    module.exports = logObject;

    }).call(this,typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

    },{}],49:[function(require,module,exports){

    module.exports = {
      isObject: function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
      }

    , extend: function(obj) {
        if (!this.isObject(obj)) {
          return obj;
        }
        var source, prop;
        for (var i = 1, length = arguments.length; i < length; i++) {
          source = arguments[i];
          for (prop in source) {
            if (Object.prototype.hasOwnProperty.call(source, prop)) {
              obj[prop] = source[prop];
            }
          }
        }
        return obj;
      }
    };

    },{}],50:[function(require,module,exports){

    var crypto = require('crypto');

    // This string has length 32, a power of 2, so the modulus doesn't introduce a
    // bias.
    var _randomStringChars = 'abcdefghijklmnopqrstuvwxyz012345';
    module.exports = {
      string: function(length) {
        var max = _randomStringChars.length;
        var bytes = crypto.randomBytes(length);
        var ret = [];
        for (var i = 0; i < length; i++) {
          ret.push(_randomStringChars.substr(bytes[i] % max, 1));
        }
        return ret.join('');
      }

    , number: function(max) {
        return Math.floor(Math.random() * max);
      }

    , numberString: function(max) {
        var t = ('' + (max - 1)).length;
        var p = new Array(t + 1).join('0');
        return (p + this.number(max)).slice(-t);
      }
    };

    },{"crypto":43}],51:[function(require,module,exports){
    (function (process){

    var debug = function() {};
    if (process.env.NODE_ENV !== 'production') {
      debug = require('debug')('sockjs-client:utils:transport');
    }

    module.exports = function(availableTransports) {
      return {
        filterToEnabled: function(transportsWhitelist, info) {
          var transports = {
            main: []
          , facade: []
          };
          if (!transportsWhitelist) {
            transportsWhitelist = [];
          } else if (typeof transportsWhitelist === 'string') {
            transportsWhitelist = [transportsWhitelist];
          }

          availableTransports.forEach(function(trans) {
            if (!trans) {
              return;
            }

            if (trans.transportName === 'websocket' && info.websocket === false) {
              debug('disabled from server', 'websocket');
              return;
            }

            if (transportsWhitelist.length &&
                transportsWhitelist.indexOf(trans.transportName) === -1) {
              debug('not in whitelist', trans.transportName);
              return;
            }

            if (trans.enabled(info)) {
              debug('enabled', trans.transportName);
              transports.main.push(trans);
              if (trans.facadeTransport) {
                transports.facade.push(trans.facadeTransport);
              }
            } else {
              debug('disabled', trans.transportName);
            }
          });
          return transports;
        }
      };
    };

    }).call(this,{ env: {} });

    },{"debug":55}],52:[function(require,module,exports){
    (function (process){

    var URL = require('url-parse');

    var debug = function() {};
    if (process.env.NODE_ENV !== 'production') {
      debug = require('debug')('sockjs-client:utils:url');
    }

    module.exports = {
      getOrigin: function(url) {
        if (!url) {
          return null;
        }

        var p = new URL(url);
        if (p.protocol === 'file:') {
          return null;
        }

        var port = p.port;
        if (!port) {
          port = (p.protocol === 'https:') ? '443' : '80';
        }

        return p.protocol + '//' + p.hostname + ':' + port;
      }

    , isOriginEqual: function(a, b) {
        var res = this.getOrigin(a) === this.getOrigin(b);
        debug('same', a, b, res);
        return res;
      }

    , isSchemeEqual: function(a, b) {
        return (a.split(':')[0] === b.split(':')[0]);
      }

    , addPath: function (url, path) {
        var qs = url.split('?');
        return qs[0] + path + (qs[1] ? '?' + qs[1] : '');
      }

    , addQuery: function (url, q) {
        return url + (url.indexOf('?') === -1 ? ('?' + q) : ('&' + q));
      }

    , isLoopbackAddr: function (addr) {
        return /^127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) || /^\[::1\]$/.test(addr);
      }
    };

    }).call(this,{ env: {} });

    },{"debug":55,"url-parse":61}],53:[function(require,module,exports){
    module.exports = '1.5.1';

    },{}],54:[function(require,module,exports){
    /**
     * Helpers.
     */

    var s = 1000;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;

    /**
     * Parse or format the given `val`.
     *
     * Options:
     *
     *  - `long` verbose formatting [false]
     *
     * @param {String|Number} val
     * @param {Object} [options]
     * @throws {Error} throw an error if val is not a non-empty string or a number
     * @return {String|Number}
     * @api public
     */

    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === 'string' && val.length > 0) {
        return parse(val);
      } else if (type === 'number' && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        'val is not a non-empty string or a valid number. val=' +
          JSON.stringify(val)
      );
    };

    /**
     * Parse the given `str` and return milliseconds.
     *
     * @param {String} str
     * @return {Number}
     * @api private
     */

    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || 'ms').toLowerCase();
      switch (type) {
        case 'years':
        case 'year':
        case 'yrs':
        case 'yr':
        case 'y':
          return n * y;
        case 'weeks':
        case 'week':
        case 'w':
          return n * w;
        case 'days':
        case 'day':
        case 'd':
          return n * d;
        case 'hours':
        case 'hour':
        case 'hrs':
        case 'hr':
        case 'h':
          return n * h;
        case 'minutes':
        case 'minute':
        case 'mins':
        case 'min':
        case 'm':
          return n * m;
        case 'seconds':
        case 'second':
        case 'secs':
        case 'sec':
        case 's':
          return n * s;
        case 'milliseconds':
        case 'millisecond':
        case 'msecs':
        case 'msec':
        case 'ms':
          return n;
        default:
          return undefined;
      }
    }

    /**
     * Short format for `ms`.
     *
     * @param {Number} ms
     * @return {String}
     * @api private
     */

    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + 'd';
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + 'h';
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + 'm';
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + 's';
      }
      return ms + 'ms';
    }

    /**
     * Long format for `ms`.
     *
     * @param {Number} ms
     * @return {String}
     * @api private
     */

    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, 'day');
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, 'hour');
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, 'minute');
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, 'second');
      }
      return ms + ' ms';
    }

    /**
     * Pluralization helper.
     */

    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
    }

    },{}],55:[function(require,module,exports){
    (function (process){

    function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

    /* eslint-env browser */

    /**
     * This is the web browser implementation of `debug()`.
     */
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    /**
     * Colors.
     */

    exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
    /**
     * Currently only WebKit-based Web Inspectors, Firefox >= v31,
     * and the Firebug extension (any Firefox version) are known
     * to support "%c" CSS customizations.
     *
     * TODO: add a `localStorage` variable to explicitly enable/disable colors
     */
    // eslint-disable-next-line complexity

    function useColors() {
      // NB: In an Electron preload script, document will be defined but not fully
      // initialized. Since we know we're in Chrome, we'll just detect this case
      // explicitly
      if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
        return true;
      } // Internet Explorer and Edge do not support colors.


      if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      } // Is webkit? http://stackoverflow.com/a/16459606/376773
      // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


      return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    /**
     * Colorize log arguments if enabled.
     *
     * @api public
     */


    function formatArgs(args) {
      args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

      if (!this.useColors) {
        return;
      }

      var c = 'color: ' + this.color;
      args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
      // arguments passed either before or after the %c, so we need to
      // figure out the correct index to insert the CSS into

      var index = 0;
      var lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, function (match) {
        if (match === '%%') {
          return;
        }

        index++;

        if (match === '%c') {
          // We only are interested in the *last* %c
          // (the user may have provided their own)
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    /**
     * Invokes `console.log()` when available.
     * No-op when `console.log` is not a "function".
     *
     * @api public
     */


    function log() {
      var _console;

      // This hackery is required for IE8/9, where
      // the `console.log` function doesn't have 'apply'
      return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
    }
    /**
     * Save `namespaces`.
     *
     * @param {String} namespaces
     * @api private
     */


    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem('debug', namespaces);
        } else {
          exports.storage.removeItem('debug');
        }
      } catch (error) {// Swallow
        // XXX (@Qix-) should we be logging these?
      }
    }
    /**
     * Load `namespaces`.
     *
     * @return {String} returns the previously persisted debug modes
     * @api private
     */


    function load() {
      var r;

      try {
        r = exports.storage.getItem('debug');
      } catch (error) {} // Swallow
      // XXX (@Qix-) should we be logging these?
      // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


      if (!r && typeof process !== 'undefined' && 'env' in process) {
        r = process.env.DEBUG;
      }

      return r;
    }
    /**
     * Localstorage attempts to return the localstorage.
     *
     * This is necessary because safari throws
     * when a user disables cookies/localstorage
     * and you attempt to access it.
     *
     * @return {LocalStorage}
     * @api private
     */


    function localstorage() {
      try {
        // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
        // The Browser also has localStorage in the global context.
        return localStorage;
      } catch (error) {// Swallow
        // XXX (@Qix-) should we be logging these?
      }
    }

    module.exports = require('./common')(exports);
    var formatters = module.exports.formatters;
    /**
     * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
     */

    formatters.j = function (v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return '[UnexpectedJSONParseError]: ' + error.message;
      }
    };


    }).call(this,{ env: {} });

    },{"./common":56}],56:[function(require,module,exports){

    /**
     * This is the common logic for both the Node.js and web browser
     * implementations of `debug()`.
     */
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require('ms');
      Object.keys(env).forEach(function (key) {
        createDebug[key] = env[key];
      });
      /**
      * Active `debug` instances.
      */

      createDebug.instances = [];
      /**
      * The currently active debug mode names, and names to skip.
      */

      createDebug.names = [];
      createDebug.skips = [];
      /**
      * Map of special "%n" handling functions, for the debug "format" argument.
      *
      * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
      */

      createDebug.formatters = {};
      /**
      * Selects a color for a debug namespace
      * @param {String} namespace The namespace string for the for the debug instance to be colored
      * @return {Number|String} An ANSI color code for the given namespace
      * @api private
      */

      function selectColor(namespace) {
        var hash = 0;

        for (var i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0; // Convert to 32bit integer
        }

        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }

      createDebug.selectColor = selectColor;
      /**
      * Create a debugger with the given `namespace`.
      *
      * @param {String} namespace
      * @return {Function}
      * @api public
      */

      function createDebug(namespace) {
        var prevTime;

        function debug() {
          // Disabled?
          if (!debug.enabled) {
            return;
          }

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var self = debug; // Set `diff` timestamp

          var curr = Number(new Date());
          var ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);

          if (typeof args[0] !== 'string') {
            // Anything else let's inspect with %O
            args.unshift('%O');
          } // Apply any `formatters` transformations


          var index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
            // If we encounter an escaped % then don't increase the array index
            if (match === '%%') {
              return match;
            }

            index++;
            var formatter = createDebug.formatters[format];

            if (typeof formatter === 'function') {
              var val = args[index];
              match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

              args.splice(index, 1);
              index--;
            }

            return match;
          }); // Apply env-specific formatting (colors, etc.)

          createDebug.formatArgs.call(self, args);
          var logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }

        debug.namespace = namespace;
        debug.enabled = createDebug.enabled(namespace);
        debug.useColors = createDebug.useColors();
        debug.color = selectColor(namespace);
        debug.destroy = destroy;
        debug.extend = extend; // Debug.formatArgs = formatArgs;
        // debug.rawLog = rawLog;
        // env-specific initialization logic for debug instances

        if (typeof createDebug.init === 'function') {
          createDebug.init(debug);
        }

        createDebug.instances.push(debug);
        return debug;
      }

      function destroy() {
        var index = createDebug.instances.indexOf(this);

        if (index !== -1) {
          createDebug.instances.splice(index, 1);
          return true;
        }

        return false;
      }

      function extend(namespace, delimiter) {
        return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
      }
      /**
      * Enables a debug mode by namespaces. This can include modes
      * separated by a colon and wildcards.
      *
      * @param {String} namespaces
      * @api public
      */


      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.names = [];
        createDebug.skips = [];
        var i;
        var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
        var len = split.length;

        for (i = 0; i < len; i++) {
          if (!split[i]) {
            // ignore empty strings
            continue;
          }

          namespaces = split[i].replace(/\*/g, '.*?');

          if (namespaces[0] === '-') {
            createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
          } else {
            createDebug.names.push(new RegExp('^' + namespaces + '$'));
          }
        }

        for (i = 0; i < createDebug.instances.length; i++) {
          var instance = createDebug.instances[i];
          instance.enabled = createDebug.enabled(instance.namespace);
        }
      }
      /**
      * Disable debug output.
      *
      * @api public
      */


      function disable() {
        createDebug.enable('');
      }
      /**
      * Returns true if the given mode name is enabled, false otherwise.
      *
      * @param {String} name
      * @return {Boolean}
      * @api public
      */


      function enabled(name) {
        if (name[name.length - 1] === '*') {
          return true;
        }

        var i;
        var len;

        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }

        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }

        return false;
      }
      /**
      * Coerce `val`.
      *
      * @param {Mixed} val
      * @return {Mixed}
      * @api private
      */


      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }

        return val;
      }

      createDebug.enable(createDebug.load());
      return createDebug;
    }

    module.exports = setup;


    },{"ms":54}],57:[function(require,module,exports){
    if (typeof Object.create === 'function') {
      // implementation from standard node.js 'util' module
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      // old school shim for old browsers
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function () {};
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }

    },{}],58:[function(require,module,exports){
    (function (global){
    (function () {
      // Detect the `define` function exposed by asynchronous module loaders. The
      // strict `define` check is necessary for compatibility with `r.js`.
      var isLoader = typeof define === "function" ;

      // A set of types used to distinguish objects from primitives.
      var objectTypes = {
        "function": true,
        "object": true
      };

      // Detect the `exports` object exposed by CommonJS implementations.
      var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

      // Use the `global` object exposed by Node (including Browserify via
      // `insert-module-globals`), Narwhal, and Ringo as the default context,
      // and the `window` object in browsers. Rhino exports a `global` function
      // instead.
      var root = objectTypes[typeof window] && window || this,
          freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;

      if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
        root = freeGlobal;
      }

      // Public: Initializes JSON 3 using the given `context` object, attaching the
      // `stringify` and `parse` functions to the specified `exports` object.
      function runInContext(context, exports) {
        context || (context = root.Object());
        exports || (exports = root.Object());

        // Native constructor aliases.
        var Number = context.Number || root.Number,
            String = context.String || root.String,
            Object = context.Object || root.Object,
            Date = context.Date || root.Date,
            SyntaxError = context.SyntaxError || root.SyntaxError,
            TypeError = context.TypeError || root.TypeError,
            Math = context.Math || root.Math,
            nativeJSON = context.JSON || root.JSON;

        // Delegate to the native `stringify` and `parse` implementations.
        if (typeof nativeJSON == "object" && nativeJSON) {
          exports.stringify = nativeJSON.stringify;
          exports.parse = nativeJSON.parse;
        }

        // Convenience aliases.
        var objectProto = Object.prototype,
            getClass = objectProto.toString,
            isProperty = objectProto.hasOwnProperty,
            undefined$1;

        // Internal: Contains `try...catch` logic used by other functions.
        // This prevents other functions from being deoptimized.
        function attempt(func, errorFunc) {
          try {
            func();
          } catch (exception) {
            if (errorFunc) {
              errorFunc();
            }
          }
        }

        // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
        var isExtended = new Date(-3509827334573292);
        attempt(function () {
          // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
          // results for certain dates in Opera >= 10.53.
          isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
            isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
        });

        // Internal: Determines whether the native `JSON.stringify` and `parse`
        // implementations are spec-compliant. Based on work by Ken Snyder.
        function has(name) {
          if (has[name] != null) {
            // Return cached feature test result.
            return has[name];
          }
          var isSupported;
          if (name == "bug-string-char-index") {
            // IE <= 7 doesn't support accessing string characters using square
            // bracket notation. IE 8 only supports this for primitives.
            isSupported = "a"[0] != "a";
          } else if (name == "json") {
            // Indicates whether both `JSON.stringify` and `JSON.parse` are
            // supported.
            isSupported = has("json-stringify") && has("date-serialization") && has("json-parse");
          } else if (name == "date-serialization") {
            // Indicates whether `Date`s can be serialized accurately by `JSON.stringify`.
            isSupported = has("json-stringify") && isExtended;
            if (isSupported) {
              var stringify = exports.stringify;
              attempt(function () {
                isSupported =
                  // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                  // serialize extended years.
                  stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
                  // The milliseconds are optional in ES 5, but required in 5.1.
                  stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
                  // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                  // four-digit years instead of six-digit years. Credits: @Yaffle.
                  stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
                  // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                  // values less than 1000. Credits: @Yaffle.
                  stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
              });
            }
          } else {
            var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
            // Test `JSON.stringify`.
            if (name == "json-stringify") {
              var stringify = exports.stringify, stringifySupported = typeof stringify == "function";
              if (stringifySupported) {
                // A test function object with a custom `toJSON` method.
                (value = function () {
                  return 1;
                }).toJSON = value;
                attempt(function () {
                  stringifySupported =
                    // Firefox 3.1b1 and b2 serialize string, number, and boolean
                    // primitives as object literals.
                    stringify(0) === "0" &&
                    // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                    // literals.
                    stringify(new Number()) === "0" &&
                    stringify(new String()) == '""' &&
                    // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                    // does not define a canonical JSON representation (this applies to
                    // objects with `toJSON` properties as well, *unless* they are nested
                    // within an object or array).
                    stringify(getClass) === undefined$1 &&
                    // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                    // FF 3.1b3 pass this test.
                    stringify(undefined$1) === undefined$1 &&
                    // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                    // respectively, if the value is omitted entirely.
                    stringify() === undefined$1 &&
                    // FF 3.1b1, 2 throw an error if the given value is not a number,
                    // string, array, object, Boolean, or `null` literal. This applies to
                    // objects with custom `toJSON` methods as well, unless they are nested
                    // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                    // methods entirely.
                    stringify(value) === "1" &&
                    stringify([value]) == "[1]" &&
                    // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                    // `"[null]"`.
                    stringify([undefined$1]) == "[null]" &&
                    // YUI 3.0.0b1 fails to serialize `null` literals.
                    stringify(null) == "null" &&
                    // FF 3.1b1, 2 halts serialization if an array contains a function:
                    // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                    // elides non-JSON values from objects and arrays, unless they
                    // define custom `toJSON` methods.
                    stringify([undefined$1, getClass, null]) == "[null,null,null]" &&
                    // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                    // where character escape codes are expected (e.g., `\b` => `\u0008`).
                    stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
                    // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                    stringify(null, value) === "1" &&
                    stringify([1, 2], null, 1) == "[\n 1,\n 2\n]";
                }, function () {
                  stringifySupported = false;
                });
              }
              isSupported = stringifySupported;
            }
            // Test `JSON.parse`.
            if (name == "json-parse") {
              var parse = exports.parse, parseSupported;
              if (typeof parse == "function") {
                attempt(function () {
                  // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
                  // Conforming implementations should also coerce the initial argument to
                  // a string prior to parsing.
                  if (parse("0") === 0 && !parse(false)) {
                    // Simple parsing test.
                    value = parse(serialized);
                    parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                    if (parseSupported) {
                      attempt(function () {
                        // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                        parseSupported = !parse('"\t"');
                      });
                      if (parseSupported) {
                        attempt(function () {
                          // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                          // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                          // certain octal literals.
                          parseSupported = parse("01") !== 1;
                        });
                      }
                      if (parseSupported) {
                        attempt(function () {
                          // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                          // points. These environments, along with FF 3.1b1 and 2,
                          // also allow trailing commas in JSON objects and arrays.
                          parseSupported = parse("1.") !== 1;
                        });
                      }
                    }
                  }
                }, function () {
                  parseSupported = false;
                });
              }
              isSupported = parseSupported;
            }
          }
          return has[name] = !!isSupported;
        }
        has["bug-string-char-index"] = has["date-serialization"] = has["json"] = has["json-stringify"] = has["json-parse"] = null;

        if (!has("json")) {
          // Common `[[Class]]` name aliases.
          var functionClass = "[object Function]",
              dateClass = "[object Date]",
              numberClass = "[object Number]",
              stringClass = "[object String]",
              arrayClass = "[object Array]",
              booleanClass = "[object Boolean]";

          // Detect incomplete support for accessing string characters by index.
          var charIndexBuggy = has("bug-string-char-index");

          // Internal: Normalizes the `for...in` iteration algorithm across
          // environments. Each enumerated key is yielded to a `callback` function.
          var forOwn = function (object, callback) {
            var size = 0, Properties, dontEnums, property;

            // Tests for bugs in the current environment's `for...in` algorithm. The
            // `valueOf` property inherits the non-enumerable flag from
            // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
            (Properties = function () {
              this.valueOf = 0;
            }).prototype.valueOf = 0;

            // Iterate over a new instance of the `Properties` class.
            dontEnums = new Properties();
            for (property in dontEnums) {
              // Ignore all properties inherited from `Object.prototype`.
              if (isProperty.call(dontEnums, property)) {
                size++;
              }
            }
            Properties = dontEnums = null;

            // Normalize the iteration algorithm.
            if (!size) {
              // A list of non-enumerable properties inherited from `Object.prototype`.
              dontEnums = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
              // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
              // properties.
              forOwn = function (object, callback) {
                var isFunction = getClass.call(object) == functionClass, property, length;
                var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
                for (property in object) {
                  // Gecko <= 1.0 enumerates the `prototype` property of functions under
                  // certain conditions; IE does not.
                  if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                    callback(property);
                  }
                }
                // Manually invoke the callback for each non-enumerable property.
                for (length = dontEnums.length; property = dontEnums[--length];) {
                  if (hasProperty.call(object, property)) {
                    callback(property);
                  }
                }
              };
            } else {
              // No bugs detected; use the standard `for...in` algorithm.
              forOwn = function (object, callback) {
                var isFunction = getClass.call(object) == functionClass, property, isConstructor;
                for (property in object) {
                  if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                    callback(property);
                  }
                }
                // Manually invoke the callback for the `constructor` property due to
                // cross-environment inconsistencies.
                if (isConstructor || isProperty.call(object, (property = "constructor"))) {
                  callback(property);
                }
              };
            }
            return forOwn(object, callback);
          };

          // Public: Serializes a JavaScript `value` as a JSON string. The optional
          // `filter` argument may specify either a function that alters how object and
          // array members are serialized, or an array of strings and numbers that
          // indicates which properties should be serialized. The optional `width`
          // argument may be either a string or number that specifies the indentation
          // level of the output.
          if (!has("json-stringify") && !has("date-serialization")) {
            // Internal: A map of control characters and their escaped equivalents.
            var Escapes = {
              92: "\\\\",
              34: '\\"',
              8: "\\b",
              12: "\\f",
              10: "\\n",
              13: "\\r",
              9: "\\t"
            };

            // Internal: Converts `value` into a zero-padded string such that its
            // length is at least equal to `width`. The `width` must be <= 6.
            var leadingZeroes = "000000";
            var toPaddedString = function (width, value) {
              // The `|| 0` expression is necessary to work around a bug in
              // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
              return (leadingZeroes + (value || 0)).slice(-width);
            };

            // Internal: Serializes a date object.
            var serializeDate = function (value) {
              var getData, year, month, date, time, hours, minutes, seconds, milliseconds;
              // Define additional utility methods if the `Date` methods are buggy.
              if (!isExtended) {
                var floor = Math.floor;
                // A mapping between the months of the year and the number of days between
                // January 1st and the first of the respective month.
                var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
                // Internal: Calculates the number of days between the Unix epoch and the
                // first day of the given month.
                var getDay = function (year, month) {
                  return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
                };
                getData = function (value) {
                  // Manually compute the year, month, date, hours, minutes,
                  // seconds, and milliseconds if the `getUTC*` methods are
                  // buggy. Adapted from @Yaffle's `date-shim` project.
                  date = floor(value / 864e5);
                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                  date = 1 + date - getDay(year, month);
                  // The `time` value specifies the time within the day (see ES
                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                  // to compute `A modulo B`, as the `%` operator does not
                  // correspond to the `modulo` operation for negative numbers.
                  time = (value % 864e5 + 864e5) % 864e5;
                  // The hours, minutes, seconds, and milliseconds are obtained by
                  // decomposing the time within the day. See section 15.9.1.10.
                  hours = floor(time / 36e5) % 24;
                  minutes = floor(time / 6e4) % 60;
                  seconds = floor(time / 1e3) % 60;
                  milliseconds = time % 1e3;
                };
              } else {
                getData = function (value) {
                  year = value.getUTCFullYear();
                  month = value.getUTCMonth();
                  date = value.getUTCDate();
                  hours = value.getUTCHours();
                  minutes = value.getUTCMinutes();
                  seconds = value.getUTCSeconds();
                  milliseconds = value.getUTCMilliseconds();
                };
              }
              serializeDate = function (value) {
                if (value > -1 / 0 && value < 1 / 0) {
                  // Dates are serialized according to the `Date#toJSON` method
                  // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                  // for the ISO 8601 date time string format.
                  getData(value);
                  // Serialize extended years correctly.
                  value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                  // Months, dates, hours, minutes, and seconds should have two
                  // digits; milliseconds should have three.
                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                  // Milliseconds are optional in ES 5.0, but required in 5.1.
                  "." + toPaddedString(3, milliseconds) + "Z";
                  year = month = date = hours = minutes = seconds = milliseconds = null;
                } else {
                  value = null;
                }
                return value;
              };
              return serializeDate(value);
            };

            // For environments with `JSON.stringify` but buggy date serialization,
            // we override the native `Date#toJSON` implementation with a
            // spec-compliant one.
            if (has("json-stringify") && !has("date-serialization")) {
              // Internal: the `Date#toJSON` implementation used to override the native one.
              function dateToJSON (key) {
                return serializeDate(this);
              }

              // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
              var nativeStringify = exports.stringify;
              exports.stringify = function (source, filter, width) {
                var nativeToJSON = Date.prototype.toJSON;
                Date.prototype.toJSON = dateToJSON;
                var result = nativeStringify(source, filter, width);
                Date.prototype.toJSON = nativeToJSON;
                return result;
              };
            } else {
              // Internal: Double-quotes a string `value`, replacing all ASCII control
              // characters (characters with code unit values between 0 and 31) with
              // their escaped equivalents. This is an implementation of the
              // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
              var unicodePrefix = "\\u00";
              var escapeChar = function (character) {
                var charCode = character.charCodeAt(0), escaped = Escapes[charCode];
                if (escaped) {
                  return escaped;
                }
                return unicodePrefix + toPaddedString(2, charCode.toString(16));
              };
              var reEscape = /[\x00-\x1f\x22\x5c]/g;
              var quote = function (value) {
                reEscape.lastIndex = 0;
                return '"' +
                  (
                    reEscape.test(value)
                      ? value.replace(reEscape, escapeChar)
                      : value
                  ) +
                  '"';
              };

              // Internal: Recursively serializes an object. Implements the
              // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
              var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
                var value, type, className, results, element, index, length, prefix, result;
                attempt(function () {
                  // Necessary for host object support.
                  value = object[property];
                });
                if (typeof value == "object" && value) {
                  if (value.getUTCFullYear && getClass.call(value) == dateClass && value.toJSON === Date.prototype.toJSON) {
                    value = serializeDate(value);
                  } else if (typeof value.toJSON == "function") {
                    value = value.toJSON(property);
                  }
                }
                if (callback) {
                  // If a replacement function was provided, call it to obtain the value
                  // for serialization.
                  value = callback.call(object, property, value);
                }
                // Exit early if value is `undefined` or `null`.
                if (value == undefined$1) {
                  return value === undefined$1 ? value : "null";
                }
                type = typeof value;
                // Only call `getClass` if the value is an object.
                if (type == "object") {
                  className = getClass.call(value);
                }
                switch (className || type) {
                  case "boolean":
                  case booleanClass:
                    // Booleans are represented literally.
                    return "" + value;
                  case "number":
                  case numberClass:
                    // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
                    // `"null"`.
                    return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
                  case "string":
                  case stringClass:
                    // Strings are double-quoted and escaped.
                    return quote("" + value);
                }
                // Recursively serialize objects and arrays.
                if (typeof value == "object") {
                  // Check for cyclic structures. This is a linear search; performance
                  // is inversely proportional to the number of unique nested objects.
                  for (length = stack.length; length--;) {
                    if (stack[length] === value) {
                      // Cyclic structures cannot be serialized by `JSON.stringify`.
                      throw TypeError();
                    }
                  }
                  // Add the object to the stack of traversed objects.
                  stack.push(value);
                  results = [];
                  // Save the current indentation level and indent one additional level.
                  prefix = indentation;
                  indentation += whitespace;
                  if (className == arrayClass) {
                    // Recursively serialize array elements.
                    for (index = 0, length = value.length; index < length; index++) {
                      element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                      results.push(element === undefined$1 ? "null" : element);
                    }
                    result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
                  } else {
                    // Recursively serialize object members. Members are selected from
                    // either a user-specified list of property names, or the object
                    // itself.
                    forOwn(properties || value, function (property) {
                      var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                      if (element !== undefined$1) {
                        // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                        // is not the empty string, let `member` {quote(property) + ":"}
                        // be the concatenation of `member` and the `space` character."
                        // The "`space` character" refers to the literal space
                        // character, not the `space` {width} argument provided to
                        // `JSON.stringify`.
                        results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                      }
                    });
                    result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
                  }
                  // Remove the object from the traversed object stack.
                  stack.pop();
                  return result;
                }
              };

              // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
              exports.stringify = function (source, filter, width) {
                var whitespace, callback, properties, className;
                if (objectTypes[typeof filter] && filter) {
                  className = getClass.call(filter);
                  if (className == functionClass) {
                    callback = filter;
                  } else if (className == arrayClass) {
                    // Convert the property names array into a makeshift set.
                    properties = {};
                    for (var index = 0, length = filter.length, value; index < length;) {
                      value = filter[index++];
                      className = getClass.call(value);
                      if (className == "[object String]" || className == "[object Number]") {
                        properties[value] = 1;
                      }
                    }
                  }
                }
                if (width) {
                  className = getClass.call(width);
                  if (className == numberClass) {
                    // Convert the `width` to an integer and create a string containing
                    // `width` number of space characters.
                    if ((width -= width % 1) > 0) {
                      if (width > 10) {
                        width = 10;
                      }
                      for (whitespace = ""; whitespace.length < width;) {
                        whitespace += " ";
                      }
                    }
                  } else if (className == stringClass) {
                    whitespace = width.length <= 10 ? width : width.slice(0, 10);
                  }
                }
                // Opera <= 7.54u2 discards the values associated with empty string keys
                // (`""`) only if they are used directly within an object member list
                // (e.g., `!("" in { "": 1})`).
                return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
              };
            }
          }

          // Public: Parses a JSON source string.
          if (!has("json-parse")) {
            var fromCharCode = String.fromCharCode;

            // Internal: A map of escaped control characters and their unescaped
            // equivalents.
            var Unescapes = {
              92: "\\",
              34: '"',
              47: "/",
              98: "\b",
              116: "\t",
              110: "\n",
              102: "\f",
              114: "\r"
            };

            // Internal: Stores the parser state.
            var Index, Source;

            // Internal: Resets the parser state and throws a `SyntaxError`.
            var abort = function () {
              Index = Source = null;
              throw SyntaxError();
            };

            // Internal: Returns the next token, or `"$"` if the parser has reached
            // the end of the source string. A token may be a string, number, `null`
            // literal, or Boolean literal.
            var lex = function () {
              var source = Source, length = source.length, value, begin, position, isSigned, charCode;
              while (Index < length) {
                charCode = source.charCodeAt(Index);
                switch (charCode) {
                  case 9: case 10: case 13: case 32:
                    // Skip whitespace tokens, including tabs, carriage returns, line
                    // feeds, and space characters.
                    Index++;
                    break;
                  case 123: case 125: case 91: case 93: case 58: case 44:
                    // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                    // the current position.
                    value = charIndexBuggy ? source.charAt(Index) : source[Index];
                    Index++;
                    return value;
                  case 34:
                    // `"` delimits a JSON string; advance to the next character and
                    // begin parsing the string. String tokens are prefixed with the
                    // sentinel `@` character to distinguish them from punctuators and
                    // end-of-string tokens.
                    for (value = "@", Index++; Index < length;) {
                      charCode = source.charCodeAt(Index);
                      if (charCode < 32) {
                        // Unescaped ASCII control characters (those with a code unit
                        // less than the space character) are not permitted.
                        abort();
                      } else if (charCode == 92) {
                        // A reverse solidus (`\`) marks the beginning of an escaped
                        // control character (including `"`, `\`, and `/`) or Unicode
                        // escape sequence.
                        charCode = source.charCodeAt(++Index);
                        switch (charCode) {
                          case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                            // Revive escaped control characters.
                            value += Unescapes[charCode];
                            Index++;
                            break;
                          case 117:
                            // `\u` marks the beginning of a Unicode escape sequence.
                            // Advance to the first character and validate the
                            // four-digit code point.
                            begin = ++Index;
                            for (position = Index + 4; Index < position; Index++) {
                              charCode = source.charCodeAt(Index);
                              // A valid sequence comprises four hexdigits (case-
                              // insensitive) that form a single hexadecimal value.
                              if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                                // Invalid Unicode escape sequence.
                                abort();
                              }
                            }
                            // Revive the escaped character.
                            value += fromCharCode("0x" + source.slice(begin, Index));
                            break;
                          default:
                            // Invalid escape sequence.
                            abort();
                        }
                      } else {
                        if (charCode == 34) {
                          // An unescaped double-quote character marks the end of the
                          // string.
                          break;
                        }
                        charCode = source.charCodeAt(Index);
                        begin = Index;
                        // Optimize for the common case where a string is valid.
                        while (charCode >= 32 && charCode != 92 && charCode != 34) {
                          charCode = source.charCodeAt(++Index);
                        }
                        // Append the string as-is.
                        value += source.slice(begin, Index);
                      }
                    }
                    if (source.charCodeAt(Index) == 34) {
                      // Advance to the next character and return the revived string.
                      Index++;
                      return value;
                    }
                    // Unterminated string.
                    abort();
                  default:
                    // Parse numbers and literals.
                    begin = Index;
                    // Advance past the negative sign, if one is specified.
                    if (charCode == 45) {
                      isSigned = true;
                      charCode = source.charCodeAt(++Index);
                    }
                    // Parse an integer or floating-point value.
                    if (charCode >= 48 && charCode <= 57) {
                      // Leading zeroes are interpreted as octal literals.
                      if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                        // Illegal octal literal.
                        abort();
                      }
                      isSigned = false;
                      // Parse the integer component.
                      for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                      // Floats cannot contain a leading decimal point; however, this
                      // case is already accounted for by the parser.
                      if (source.charCodeAt(Index) == 46) {
                        position = ++Index;
                        // Parse the decimal component.
                        for (; position < length; position++) {
                          charCode = source.charCodeAt(position);
                          if (charCode < 48 || charCode > 57) {
                            break;
                          }
                        }
                        if (position == Index) {
                          // Illegal trailing decimal.
                          abort();
                        }
                        Index = position;
                      }
                      // Parse exponents. The `e` denoting the exponent is
                      // case-insensitive.
                      charCode = source.charCodeAt(Index);
                      if (charCode == 101 || charCode == 69) {
                        charCode = source.charCodeAt(++Index);
                        // Skip past the sign following the exponent, if one is
                        // specified.
                        if (charCode == 43 || charCode == 45) {
                          Index++;
                        }
                        // Parse the exponential component.
                        for (position = Index; position < length; position++) {
                          charCode = source.charCodeAt(position);
                          if (charCode < 48 || charCode > 57) {
                            break;
                          }
                        }
                        if (position == Index) {
                          // Illegal empty exponent.
                          abort();
                        }
                        Index = position;
                      }
                      // Coerce the parsed value to a JavaScript number.
                      return +source.slice(begin, Index);
                    }
                    // A negative sign may only precede numbers.
                    if (isSigned) {
                      abort();
                    }
                    // `true`, `false`, and `null` literals.
                    var temp = source.slice(Index, Index + 4);
                    if (temp == "true") {
                      Index += 4;
                      return true;
                    } else if (temp == "fals" && source.charCodeAt(Index + 4 ) == 101) {
                      Index += 5;
                      return false;
                    } else if (temp == "null") {
                      Index += 4;
                      return null;
                    }
                    // Unrecognized token.
                    abort();
                }
              }
              // Return the sentinel `$` character if the parser has reached the end
              // of the source string.
              return "$";
            };

            // Internal: Parses a JSON `value` token.
            var get = function (value) {
              var results, hasMembers;
              if (value == "$") {
                // Unexpected end of input.
                abort();
              }
              if (typeof value == "string") {
                if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
                  // Remove the sentinel `@` character.
                  return value.slice(1);
                }
                // Parse object and array literals.
                if (value == "[") {
                  // Parses a JSON array, returning a new JavaScript array.
                  results = [];
                  for (;;) {
                    value = lex();
                    // A closing square bracket marks the end of the array literal.
                    if (value == "]") {
                      break;
                    }
                    // If the array literal contains elements, the current token
                    // should be a comma separating the previous element from the
                    // next.
                    if (hasMembers) {
                      if (value == ",") {
                        value = lex();
                        if (value == "]") {
                          // Unexpected trailing `,` in array literal.
                          abort();
                        }
                      } else {
                        // A `,` must separate each array element.
                        abort();
                      }
                    } else {
                      hasMembers = true;
                    }
                    // Elisions and leading commas are not permitted.
                    if (value == ",") {
                      abort();
                    }
                    results.push(get(value));
                  }
                  return results;
                } else if (value == "{") {
                  // Parses a JSON object, returning a new JavaScript object.
                  results = {};
                  for (;;) {
                    value = lex();
                    // A closing curly brace marks the end of the object literal.
                    if (value == "}") {
                      break;
                    }
                    // If the object literal contains members, the current token
                    // should be a comma separator.
                    if (hasMembers) {
                      if (value == ",") {
                        value = lex();
                        if (value == "}") {
                          // Unexpected trailing `,` in object literal.
                          abort();
                        }
                      } else {
                        // A `,` must separate each object member.
                        abort();
                      }
                    } else {
                      hasMembers = true;
                    }
                    // Leading commas are not permitted, object property names must be
                    // double-quoted strings, and a `:` must separate each property
                    // name and value.
                    if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                      abort();
                    }
                    results[value.slice(1)] = get(lex());
                  }
                  return results;
                }
                // Unexpected token encountered.
                abort();
              }
              return value;
            };

            // Internal: Updates a traversed object member.
            var update = function (source, property, callback) {
              var element = walk(source, property, callback);
              if (element === undefined$1) {
                delete source[property];
              } else {
                source[property] = element;
              }
            };

            // Internal: Recursively traverses a parsed JSON object, invoking the
            // `callback` function for each value. This is an implementation of the
            // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
            var walk = function (source, property, callback) {
              var value = source[property], length;
              if (typeof value == "object" && value) {
                // `forOwn` can't be used to traverse an array in Opera <= 8.54
                // because its `Object#hasOwnProperty` implementation returns `false`
                // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
                if (getClass.call(value) == arrayClass) {
                  for (length = value.length; length--;) {
                    update(getClass, forOwn, value, length, callback);
                  }
                } else {
                  forOwn(value, function (property) {
                    update(value, property, callback);
                  });
                }
              }
              return callback.call(source, property, value);
            };

            // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
            exports.parse = function (source, callback) {
              var result, value;
              Index = 0;
              Source = "" + source;
              result = get(lex());
              // If a JSON string contains multiple tokens, it is invalid.
              if (lex() != "$") {
                abort();
              }
              // Reset the parser state.
              Index = Source = null;
              return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
            };
          }
        }

        exports.runInContext = runInContext;
        return exports;
      }

      if (freeExports && !isLoader) {
        // Export for CommonJS environments.
        runInContext(root, freeExports);
      } else {
        // Export for web browsers and JavaScript engines.
        var nativeJSON = root.JSON,
            previousJSON = root.JSON3,
            isRestored = false;

        var JSON3 = runInContext(root, (root.JSON3 = {
          // Public: Restores the original value of the global `JSON` object and
          // returns a reference to the `JSON3` object.
          "noConflict": function () {
            if (!isRestored) {
              isRestored = true;
              root.JSON = nativeJSON;
              root.JSON3 = previousJSON;
              nativeJSON = previousJSON = null;
            }
            return JSON3;
          }
        }));

        root.JSON = {
          "parse": JSON3.parse,
          "stringify": JSON3.stringify
        };
      }
    }).call(this);

    }).call(this,typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

    },{}],59:[function(require,module,exports){

    var has = Object.prototype.hasOwnProperty
      , undef;

    /**
     * Decode a URI encoded string.
     *
     * @param {String} input The URI encoded string.
     * @returns {String|Null} The decoded string.
     * @api private
     */
    function decode(input) {
      try {
        return decodeURIComponent(input.replace(/\+/g, ' '));
      } catch (e) {
        return null;
      }
    }

    /**
     * Simple query string parser.
     *
     * @param {String} query The query string that needs to be parsed.
     * @returns {Object}
     * @api public
     */
    function querystring(query) {
      var parser = /([^=?&]+)=?([^&]*)/g
        , result = {}
        , part;

      while (part = parser.exec(query)) {
        var key = decode(part[1])
          , value = decode(part[2]);

        //
        // Prevent overriding of existing properties. This ensures that build-in
        // methods like `toString` or __proto__ are not overriden by malicious
        // querystrings.
        //
        // In the case if failed decoding, we want to omit the key/value pairs
        // from the result.
        //
        if (key === null || value === null || key in result) continue;
        result[key] = value;
      }

      return result;
    }

    /**
     * Transform a query string to an object.
     *
     * @param {Object} obj Object that should be transformed.
     * @param {String} prefix Optional prefix.
     * @returns {String}
     * @api public
     */
    function querystringify(obj, prefix) {
      prefix = prefix || '';

      var pairs = []
        , value
        , key;

      //
      // Optionally prefix with a '?' if needed
      //
      if ('string' !== typeof prefix) prefix = '?';

      for (key in obj) {
        if (has.call(obj, key)) {
          value = obj[key];

          //
          // Edge cases where we actually want to encode the value to an empty
          // string instead of the stringified value.
          //
          if (!value && (value === null || value === undef || isNaN(value))) {
            value = '';
          }

          key = encodeURIComponent(key);
          value = encodeURIComponent(value);

          //
          // If we failed to encode the strings, we should bail out as we don't
          // want to add invalid strings to the query.
          //
          if (key === null || value === null) continue;
          pairs.push(key +'='+ value);
        }
      }

      return pairs.length ? prefix + pairs.join('&') : '';
    }

    //
    // Expose the module.
    //
    exports.stringify = querystringify;
    exports.parse = querystring;

    },{}],60:[function(require,module,exports){

    /**
     * Check if we're required to add a port number.
     *
     * @see https://url.spec.whatwg.org/#default-port
     * @param {Number|String} port Port number we need to check
     * @param {String} protocol Protocol we need to check against.
     * @returns {Boolean} Is it a default port for the given protocol
     * @api private
     */
    module.exports = function required(port, protocol) {
      protocol = protocol.split(':')[0];
      port = +port;

      if (!port) return false;

      switch (protocol) {
        case 'http':
        case 'ws':
        return port !== 80;

        case 'https':
        case 'wss':
        return port !== 443;

        case 'ftp':
        return port !== 21;

        case 'gopher':
        return port !== 70;

        case 'file':
        return false;
      }

      return port !== 0;
    };

    },{}],61:[function(require,module,exports){
    (function (global){

    var required = require('requires-port')
      , qs = require('querystringify')
      , slashes = /^[A-Za-z][A-Za-z0-9+-.]*:[\\/]+/
      , protocolre = /^([a-z][a-z0-9.+-]*:)?([\\/]{1,})?([\S\s]*)/i
      , whitespace = '[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]'
      , left = new RegExp('^'+ whitespace +'+');

    /**
     * Trim a given string.
     *
     * @param {String} str String to trim.
     * @public
     */
    function trimLeft(str) {
      return (str ? str : '').toString().replace(left, '');
    }

    /**
     * These are the parse rules for the URL parser, it informs the parser
     * about:
     *
     * 0. The char it Needs to parse, if it's a string it should be done using
     *    indexOf, RegExp using exec and NaN means set as current value.
     * 1. The property we should set when parsing this value.
     * 2. Indication if it's backwards or forward parsing, when set as number it's
     *    the value of extra chars that should be split off.
     * 3. Inherit from location if non existing in the parser.
     * 4. `toLowerCase` the resulting value.
     */
    var rules = [
      ['#', 'hash'],                        // Extract from the back.
      ['?', 'query'],                       // Extract from the back.
      function sanitize(address) {          // Sanitize what is left of the address
        return address.replace('\\', '/');
      },
      ['/', 'pathname'],                    // Extract from the back.
      ['@', 'auth', 1],                     // Extract from the front.
      [NaN, 'host', undefined, 1, 1],       // Set left over value.
      [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
      [NaN, 'hostname', undefined, 1, 1]    // Set left over.
    ];

    /**
     * These properties should not be copied or inherited from. This is only needed
     * for all non blob URL's as a blob URL does not include a hash, only the
     * origin.
     *
     * @type {Object}
     * @private
     */
    var ignore = { hash: 1, query: 1 };

    /**
     * The location object differs when your code is loaded through a normal page,
     * Worker or through a worker using a blob. And with the blobble begins the
     * trouble as the location object will contain the URL of the blob, not the
     * location of the page where our code is loaded in. The actual origin is
     * encoded in the `pathname` so we can thankfully generate a good "default"
     * location from it so we can generate proper relative URL's again.
     *
     * @param {Object|String} loc Optional default location object.
     * @returns {Object} lolcation object.
     * @public
     */
    function lolcation(loc) {
      var globalVar;

      if (typeof window !== 'undefined') globalVar = window;
      else if (typeof global !== 'undefined') globalVar = global;
      else if (typeof self !== 'undefined') globalVar = self;
      else globalVar = {};

      var location = globalVar.location || {};
      loc = loc || location;

      var finaldestination = {}
        , type = typeof loc
        , key;

      if ('blob:' === loc.protocol) {
        finaldestination = new Url(unescape(loc.pathname), {});
      } else if ('string' === type) {
        finaldestination = new Url(loc, {});
        for (key in ignore) delete finaldestination[key];
      } else if ('object' === type) {
        for (key in loc) {
          if (key in ignore) continue;
          finaldestination[key] = loc[key];
        }

        if (finaldestination.slashes === undefined) {
          finaldestination.slashes = slashes.test(loc.href);
        }
      }

      return finaldestination;
    }

    /**
     * @typedef ProtocolExtract
     * @type Object
     * @property {String} protocol Protocol matched in the URL, in lowercase.
     * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
     * @property {String} rest Rest of the URL that is not part of the protocol.
     */

    /**
     * Extract protocol information from a URL with/without double slash ("//").
     *
     * @param {String} address URL we want to extract from.
     * @return {ProtocolExtract} Extracted information.
     * @private
     */
    function extractProtocol(address) {
      address = trimLeft(address);

      var match = protocolre.exec(address)
        , protocol = match[1] ? match[1].toLowerCase() : ''
        , slashes = !!(match[2] && match[2].length >= 2)
        , rest =  match[2] && match[2].length === 1 ? '/' + match[3] : match[3];

      return {
        protocol: protocol,
        slashes: slashes,
        rest: rest
      };
    }

    /**
     * Resolve a relative URL pathname against a base URL pathname.
     *
     * @param {String} relative Pathname of the relative URL.
     * @param {String} base Pathname of the base URL.
     * @return {String} Resolved pathname.
     * @private
     */
    function resolve(relative, base) {
      if (relative === '') return base;

      var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
        , i = path.length
        , last = path[i - 1]
        , unshift = false
        , up = 0;

      while (i--) {
        if (path[i] === '.') {
          path.splice(i, 1);
        } else if (path[i] === '..') {
          path.splice(i, 1);
          up++;
        } else if (up) {
          if (i === 0) unshift = true;
          path.splice(i, 1);
          up--;
        }
      }

      if (unshift) path.unshift('');
      if (last === '.' || last === '..') path.push('');

      return path.join('/');
    }

    /**
     * The actual URL instance. Instead of returning an object we've opted-in to
     * create an actual constructor as it's much more memory efficient and
     * faster and it pleases my OCD.
     *
     * It is worth noting that we should not use `URL` as class name to prevent
     * clashes with the global URL instance that got introduced in browsers.
     *
     * @constructor
     * @param {String} address URL we want to parse.
     * @param {Object|String} [location] Location defaults for relative paths.
     * @param {Boolean|Function} [parser] Parser for the query string.
     * @private
     */
    function Url(address, location, parser) {
      address = trimLeft(address);

      if (!(this instanceof Url)) {
        return new Url(address, location, parser);
      }

      var relative, extracted, parse, instruction, index, key
        , instructions = rules.slice()
        , type = typeof location
        , url = this
        , i = 0;

      //
      // The following if statements allows this module two have compatibility with
      // 2 different API:
      //
      // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
      //    where the boolean indicates that the query string should also be parsed.
      //
      // 2. The `URL` interface of the browser which accepts a URL, object as
      //    arguments. The supplied object will be used as default values / fall-back
      //    for relative paths.
      //
      if ('object' !== type && 'string' !== type) {
        parser = location;
        location = null;
      }

      if (parser && 'function' !== typeof parser) parser = qs.parse;

      location = lolcation(location);

      //
      // Extract protocol information before running the instructions.
      //
      extracted = extractProtocol(address || '');
      relative = !extracted.protocol && !extracted.slashes;
      url.slashes = extracted.slashes || relative && location.slashes;
      url.protocol = extracted.protocol || location.protocol || '';
      address = extracted.rest;

      //
      // When the authority component is absent the URL starts with a path
      // component.
      //
      if (!extracted.slashes) instructions[3] = [/(.*)/, 'pathname'];

      for (; i < instructions.length; i++) {
        instruction = instructions[i];

        if (typeof instruction === 'function') {
          address = instruction(address);
          continue;
        }

        parse = instruction[0];
        key = instruction[1];

        if (parse !== parse) {
          url[key] = address;
        } else if ('string' === typeof parse) {
          if (~(index = address.indexOf(parse))) {
            if ('number' === typeof instruction[2]) {
              url[key] = address.slice(0, index);
              address = address.slice(index + instruction[2]);
            } else {
              url[key] = address.slice(index);
              address = address.slice(0, index);
            }
          }
        } else if ((index = parse.exec(address))) {
          url[key] = index[1];
          address = address.slice(0, index.index);
        }

        url[key] = url[key] || (
          relative && instruction[3] ? location[key] || '' : ''
        );

        //
        // Hostname, host and protocol should be lowercased so they can be used to
        // create a proper `origin`.
        //
        if (instruction[4]) url[key] = url[key].toLowerCase();
      }

      //
      // Also parse the supplied query string in to an object. If we're supplied
      // with a custom parser as function use that instead of the default build-in
      // parser.
      //
      if (parser) url.query = parser(url.query);

      //
      // If the URL is relative, resolve the pathname against the base URL.
      //
      if (
          relative
        && location.slashes
        && url.pathname.charAt(0) !== '/'
        && (url.pathname !== '' || location.pathname !== '')
      ) {
        url.pathname = resolve(url.pathname, location.pathname);
      }

      //
      // Default to a / for pathname if none exists. This normalizes the URL
      // to always have a /
      //
      if (url.pathname.charAt(0) !== '/' && url.hostname) {
        url.pathname = '/' + url.pathname;
      }

      //
      // We should not add port numbers if they are already the default port number
      // for a given protocol. As the host also contains the port number we're going
      // override it with the hostname which contains no port number.
      //
      if (!required(url.port, url.protocol)) {
        url.host = url.hostname;
        url.port = '';
      }

      //
      // Parse down the `auth` for the username and password.
      //
      url.username = url.password = '';
      if (url.auth) {
        instruction = url.auth.split(':');
        url.username = instruction[0] || '';
        url.password = instruction[1] || '';
      }

      url.origin = url.protocol && url.host && url.protocol !== 'file:'
        ? url.protocol +'//'+ url.host
        : 'null';

      //
      // The href is just the compiled result.
      //
      url.href = url.toString();
    }

    /**
     * This is convenience method for changing properties in the URL instance to
     * insure that they all propagate correctly.
     *
     * @param {String} part          Property we need to adjust.
     * @param {Mixed} value          The newly assigned value.
     * @param {Boolean|Function} fn  When setting the query, it will be the function
     *                               used to parse the query.
     *                               When setting the protocol, double slash will be
     *                               removed from the final url if it is true.
     * @returns {URL} URL instance for chaining.
     * @public
     */
    function set(part, value, fn) {
      var url = this;

      switch (part) {
        case 'query':
          if ('string' === typeof value && value.length) {
            value = (fn || qs.parse)(value);
          }

          url[part] = value;
          break;

        case 'port':
          url[part] = value;

          if (!required(value, url.protocol)) {
            url.host = url.hostname;
            url[part] = '';
          } else if (value) {
            url.host = url.hostname +':'+ value;
          }

          break;

        case 'hostname':
          url[part] = value;

          if (url.port) value += ':'+ url.port;
          url.host = value;
          break;

        case 'host':
          url[part] = value;

          if (/:\d+$/.test(value)) {
            value = value.split(':');
            url.port = value.pop();
            url.hostname = value.join(':');
          } else {
            url.hostname = value;
            url.port = '';
          }

          break;

        case 'protocol':
          url.protocol = value.toLowerCase();
          url.slashes = !fn;
          break;

        case 'pathname':
        case 'hash':
          if (value) {
            var char = part === 'pathname' ? '/' : '#';
            url[part] = value.charAt(0) !== char ? char + value : value;
          } else {
            url[part] = value;
          }
          break;

        default:
          url[part] = value;
      }

      for (var i = 0; i < rules.length; i++) {
        var ins = rules[i];

        if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
      }

      url.origin = url.protocol && url.host && url.protocol !== 'file:'
        ? url.protocol +'//'+ url.host
        : 'null';

      url.href = url.toString();

      return url;
    }

    /**
     * Transform the properties back in to a valid and full URL string.
     *
     * @param {Function} stringify Optional query stringify function.
     * @returns {String} Compiled version of the URL.
     * @public
     */
    function toString(stringify) {
      if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

      var query
        , url = this
        , protocol = url.protocol;

      if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

      var result = protocol + (url.slashes ? '//' : '');

      if (url.username) {
        result += url.username;
        if (url.password) result += ':'+ url.password;
        result += '@';
      }

      result += url.host + url.pathname;

      query = 'object' === typeof url.query ? stringify(url.query) : url.query;
      if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

      if (url.hash) result += url.hash;

      return result;
    }

    Url.prototype = { set: set, toString: toString };

    //
    // Expose the URL parser and some additional properties that might be useful for
    // others or testing.
    //
    Url.extractProtocol = extractProtocol;
    Url.location = lolcation;
    Url.trimLeft = trimLeft;
    Url.qs = qs;

    module.exports = Url;

    }).call(this,typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

    },{"querystringify":59,"requires-port":60}]},{},[1])(1)
    });

    var stomp_umd = {exports: {}};

    (function (module, exports) {
    (function webpackUniversalModuleDefinition(root, factory) {
    	module.exports = factory();
    })(typeof self !== 'undefined' ? self : commonjsGlobal, function() {
    return /******/ (function(modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/ 	var installedModules = {};
    /******/
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
    /******/
    /******/ 		// Check if module is in cache
    /******/ 		if(installedModules[moduleId]) {
    /******/ 			return installedModules[moduleId].exports;
    /******/ 		}
    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		var module = installedModules[moduleId] = {
    /******/ 			i: moduleId,
    /******/ 			l: false,
    /******/ 			exports: {}
    /******/ 		};
    /******/
    /******/ 		// Execute the module function
    /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ 		// Flag the module as loaded
    /******/ 		module.l = true;
    /******/
    /******/ 		// Return the exports of the module
    /******/ 		return module.exports;
    /******/ 	}
    /******/
    /******/
    /******/ 	// expose the modules object (__webpack_modules__)
    /******/ 	__webpack_require__.m = modules;
    /******/
    /******/ 	// expose the module cache
    /******/ 	__webpack_require__.c = installedModules;
    /******/
    /******/ 	// define getter function for harmony exports
    /******/ 	__webpack_require__.d = function(exports, name, getter) {
    /******/ 		if(!__webpack_require__.o(exports, name)) {
    /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
    /******/ 		}
    /******/ 	};
    /******/
    /******/ 	// define __esModule on exports
    /******/ 	__webpack_require__.r = function(exports) {
    /******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    /******/ 		}
    /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
    /******/ 	};
    /******/
    /******/ 	// create a fake namespace object
    /******/ 	// mode & 1: value is a module id, require it
    /******/ 	// mode & 2: merge all properties of value into the ns
    /******/ 	// mode & 4: return value when already ns object
    /******/ 	// mode & 8|1: behave like require
    /******/ 	__webpack_require__.t = function(value, mode) {
    /******/ 		if(mode & 1) value = __webpack_require__(value);
    /******/ 		if(mode & 8) return value;
    /******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    /******/ 		var ns = Object.create(null);
    /******/ 		__webpack_require__.r(ns);
    /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    /******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
    /******/ 		return ns;
    /******/ 	};
    /******/
    /******/ 	// getDefaultExport function for compatibility with non-harmony modules
    /******/ 	__webpack_require__.n = function(module) {
    /******/ 		var getter = module && module.__esModule ?
    /******/ 			function getDefault() { return module['default']; } :
    /******/ 			function getModuleExports() { return module; };
    /******/ 		__webpack_require__.d(getter, 'a', getter);
    /******/ 		return getter;
    /******/ 	};
    /******/
    /******/ 	// Object.prototype.hasOwnProperty.call
    /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    /******/
    /******/ 	// __webpack_public_path__
    /******/ 	__webpack_require__.p = "";
    /******/
    /******/
    /******/ 	// Load entry module and return exports
    /******/ 	return __webpack_require__(__webpack_require__.s = 0);
    /******/ })
    /************************************************************************/
    /******/ ({

    /***/ "./src/byte.ts":
    /*!*********************!*\
      !*** ./src/byte.ts ***!
      \*********************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Some byte values, used as per STOMP specifications.
     *
     * Part of `@stomp/stompjs`.
     *
     * @internal
     */
    exports.BYTE = {
        // LINEFEED byte (octet 10)
        LF: '\x0A',
        // NULL byte (octet 0)
        NULL: '\x00'
    };


    /***/ }),

    /***/ "./src/client.ts":
    /*!***********************!*\
      !*** ./src/client.ts ***!
      \***********************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (this && this.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var stomp_handler_1 = __webpack_require__(/*! ./stomp-handler */ "./src/stomp-handler.ts");
    var versions_1 = __webpack_require__(/*! ./versions */ "./src/versions.ts");
    var web_socket_state_1 = __webpack_require__(/*! ./web-socket-state */ "./src/web-socket-state.ts");
    /**
     * STOMP Client Class.
     *
     * Part of `@stomp/stompjs`.
     */
    var Client = /** @class */ (function () {
        /**
         * Create an instance.
         */
        function Client(conf) {
            if (conf === void 0) { conf = {}; }
            /**
             * STOMP versions to attempt during STOMP handshake. By default versions `1.0`, `1.1`, and `1.2` are attempted.
             *
             * Example:
             * ```javascript
             *        // Try only versions 1.0 and 1.1
             *        client.stompVersions = new Versions(['1.0', '1.1'])
             * ```
             */
            this.stompVersions = versions_1.Versions.default;
            /**
             *  automatically reconnect with delay in milliseconds, set to 0 to disable.
             */
            this.reconnectDelay = 5000;
            /**
             * Incoming heartbeat interval in milliseconds. Set to 0 to disable.
             */
            this.heartbeatIncoming = 10000;
            /**
             * Outgoing heartbeat interval in milliseconds. Set to 0 to disable.
             */
            this.heartbeatOutgoing = 10000;
            /**
             * This switches on a non standard behavior while sending WebSocket packets.
             * It splits larger (text) packets into chunks of [maxWebSocketChunkSize]{@link Client#maxWebSocketChunkSize}.
             * Only Java Spring brokers seems to use this mode.
             *
             * WebSockets, by itself, split large (text) packets,
             * so it is not needed with a truly compliant STOMP/WebSocket broker.
             * Actually setting it for such broker will cause large messages to fail.
             *
             * `false` by default.
             *
             * Binary frames are never split.
             */
            this.splitLargeFrames = false;
            /**
             * See [splitLargeFrames]{@link Client#splitLargeFrames}.
             * This has no effect if [splitLargeFrames]{@link Client#splitLargeFrames} is `false`.
             */
            this.maxWebSocketChunkSize = 8 * 1024;
            /**
             * Usually the
             * [type of WebSocket frame]{@link https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send#Parameters}
             * is automatically decided by type of the payload.
             * Default is `false`, which should work with all compliant brokers.
             *
             * Set this flag to force binary frames.
             */
            this.forceBinaryWSFrames = false;
            /**
             * A bug in ReactNative chops a string on occurrence of a NULL.
             * See issue [https://github.com/stomp-js/stompjs/issues/89]{@link https://github.com/stomp-js/stompjs/issues/89}.
             * This makes incoming WebSocket messages invalid STOMP packets.
             * Setting this flag attempts to reverse the damage by appending a NULL.
             * If the broker splits a large message into multiple WebSocket messages,
             * this flag will cause data loss and abnormal termination of connection.
             *
             * This is not an ideal solution, but a stop gap until the underlying issue is fixed at ReactNative library.
             */
            this.appendMissingNULLonIncoming = false;
            this._active = false;
            // Dummy callbacks
            var noOp = function () { };
            this.debug = noOp;
            this.beforeConnect = noOp;
            this.onConnect = noOp;
            this.onDisconnect = noOp;
            this.onUnhandledMessage = noOp;
            this.onUnhandledReceipt = noOp;
            this.onUnhandledFrame = noOp;
            this.onStompError = noOp;
            this.onWebSocketClose = noOp;
            this.onWebSocketError = noOp;
            this.logRawCommunication = false;
            // These parameters would typically get proper values before connect is called
            this.connectHeaders = {};
            this._disconnectHeaders = {};
            // Apply configuration
            this.configure(conf);
        }
        Object.defineProperty(Client.prototype, "webSocket", {
            /**
             * Underlying WebSocket instance, READONLY.
             */
            get: function () {
                return this._webSocket;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Client.prototype, "disconnectHeaders", {
            /**
             * Disconnection headers.
             */
            get: function () {
                return this._disconnectHeaders;
            },
            set: function (value) {
                this._disconnectHeaders = value;
                if (this._stompHandler) {
                    this._stompHandler.disconnectHeaders = this._disconnectHeaders;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Client.prototype, "connected", {
            /**
             * `true` if there is a active connection with STOMP Broker
             */
            get: function () {
                return (!!this._stompHandler) && this._stompHandler.connected;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Client.prototype, "connectedVersion", {
            /**
             * version of STOMP protocol negotiated with the server, READONLY
             */
            get: function () {
                return this._stompHandler ? this._stompHandler.connectedVersion : undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Client.prototype, "active", {
            /**
             * if the client is active (connected or going to reconnect)
             */
            get: function () {
                return this._active;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Update configuration.
         */
        Client.prototype.configure = function (conf) {
            // bulk assign all properties to this
            Object.assign(this, conf);
        };
        /**
         * Initiate the connection with the broker.
         * If the connection breaks, as per [Client#reconnectDelay]{@link Client#reconnectDelay},
         * it will keep trying to reconnect.
         *
         * Call [Client#deactivate]{@link Client#deactivate} to disconnect and stop reconnection attempts.
         */
        Client.prototype.activate = function () {
            this._active = true;
            this._connect();
        };
        Client.prototype._connect = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.connected) {
                                this.debug('STOMP: already connected, nothing to do');
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.beforeConnect()];
                        case 1:
                            _a.sent();
                            if (!this._active) {
                                this.debug('Client has been marked inactive, will not attempt to connect');
                                return [2 /*return*/];
                            }
                            this.debug('Opening Web Socket...');
                            // Get the actual WebSocket (or a similar object)
                            this._webSocket = this._createWebSocket();
                            this._stompHandler = new stomp_handler_1.StompHandler(this, this._webSocket, {
                                debug: this.debug,
                                stompVersions: this.stompVersions,
                                connectHeaders: this.connectHeaders,
                                disconnectHeaders: this._disconnectHeaders,
                                heartbeatIncoming: this.heartbeatIncoming,
                                heartbeatOutgoing: this.heartbeatOutgoing,
                                splitLargeFrames: this.splitLargeFrames,
                                maxWebSocketChunkSize: this.maxWebSocketChunkSize,
                                forceBinaryWSFrames: this.forceBinaryWSFrames,
                                logRawCommunication: this.logRawCommunication,
                                appendMissingNULLonIncoming: this.appendMissingNULLonIncoming,
                                onConnect: function (frame) {
                                    if (!_this._active) {
                                        _this.debug('STOMP got connected while deactivate was issued, will disconnect now');
                                        _this._disposeStompHandler();
                                        return;
                                    }
                                    _this.onConnect(frame);
                                },
                                onDisconnect: function (frame) {
                                    _this.onDisconnect(frame);
                                },
                                onStompError: function (frame) {
                                    _this.onStompError(frame);
                                },
                                onWebSocketClose: function (evt) {
                                    _this.onWebSocketClose(evt);
                                    // The callback is called before attempting to reconnect, this would allow the client
                                    // to be `deactivated` in the callback.
                                    if (_this._active) {
                                        _this._schedule_reconnect();
                                    }
                                },
                                onWebSocketError: function (evt) {
                                    _this.onWebSocketError(evt);
                                },
                                onUnhandledMessage: function (message) {
                                    _this.onUnhandledMessage(message);
                                },
                                onUnhandledReceipt: function (frame) {
                                    _this.onUnhandledReceipt(frame);
                                },
                                onUnhandledFrame: function (frame) {
                                    _this.onUnhandledFrame(frame);
                                }
                            });
                            this._stompHandler.start();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Client.prototype._createWebSocket = function () {
            var webSocket;
            if (this.webSocketFactory) {
                webSocket = this.webSocketFactory();
            }
            else {
                webSocket = new WebSocket(this.brokerURL, this.stompVersions.protocolVersions());
            }
            webSocket.binaryType = 'arraybuffer';
            return webSocket;
        };
        Client.prototype._schedule_reconnect = function () {
            var _this = this;
            if (this.reconnectDelay > 0) {
                this.debug("STOMP: scheduling reconnection in " + this.reconnectDelay + "ms");
                this._reconnector = setTimeout(function () {
                    _this._connect();
                }, this.reconnectDelay);
            }
        };
        /**
         * Disconnect if connected and stop auto reconnect loop.
         * Appropriate callbacks will be invoked if underlying STOMP connection was connected.
         *
         * To reactivate you can call [Client#activate]{@link Client#activate}.
         */
        Client.prototype.deactivate = function () {
            // indicate that auto reconnect loop should terminate
            this._active = false;
            // Clear if a reconnection was scheduled
            if (this._reconnector) {
                clearTimeout(this._reconnector);
            }
            this._disposeStompHandler();
        };
        /**
         * Force disconnect if there is an active connection by directly closing the underlying WebSocket.
         * This is different than a normal disconnect where a DISCONNECT sequence is carried out with the broker.
         * After forcing disconnect, automatic reconnect will be attempted.
         * To stop further reconnects call [Client#deactivate]{@link Client#deactivate} as well.
         */
        Client.prototype.forceDisconnect = function () {
            if (this._webSocket) {
                if (this._webSocket.readyState === web_socket_state_1.WebSocketState.CONNECTING
                    || this._webSocket.readyState === web_socket_state_1.WebSocketState.OPEN) {
                    this._stompHandler._closeWebsocket();
                }
            }
        };
        Client.prototype._disposeStompHandler = function () {
            // Dispose STOMP Handler
            if (this._stompHandler) {
                this._stompHandler.dispose();
                this._stompHandler = null;
            }
        };
        /**
         * Send a message to a named destination. Refer to your STOMP broker documentation for types
         * and naming of destinations.
         *
         * STOMP protocol specifies and suggests some headers and also allows broker specific headers.
         *
         * `body` must be String.
         * You will need to covert the payload to string in case it is not string (e.g. JSON).
         *
         * To send a binary message body use binaryBody parameter. It should be a
         * [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array).
         * Sometimes brokers may not support binary frames out of the box.
         * Please check your broker documentation.
         *
         * `content-length` header is automatically added to the STOMP Frame sent to the broker.
         * Set `skipContentLengthHeader` to indicate that `content-length` header should not be added.
         * For binary messages `content-length` header is always added.
         *
         * Caution: The broker will, most likely, report an error and disconnect if message body has NULL octet(s)
         * and `content-length` header is missing.
         *
         * ```javascript
         *        client.publish({destination: "/queue/test", headers: {priority: 9}, body: "Hello, STOMP"});
         *
         *        // Only destination is mandatory parameter
         *        client.publish({destination: "/queue/test", body: "Hello, STOMP"});
         *
         *        // Skip content-length header in the frame to the broker
         *        client.publish({"/queue/test", body: "Hello, STOMP", skipContentLengthHeader: true});
         *
         *        var binaryData = generateBinaryData(); // This need to be of type Uint8Array
         *        // setting content-type header is not mandatory, however a good practice
         *        client.publish({destination: '/topic/special', binaryBody: binaryData,
         *                         headers: {'content-type': 'application/octet-stream'}});
         * ```
         */
        Client.prototype.publish = function (params) {
            this._stompHandler.publish(params);
        };
        /**
         * STOMP brokers may carry out operation asynchronously and allow requesting for acknowledgement.
         * To request an acknowledgement, a `receipt` header needs to be sent with the actual request.
         * The value (say receipt-id) for this header needs to be unique for each use. Typically a sequence, a UUID, a
         * random number or a combination may be used.
         *
         * A complaint broker will send a RECEIPT frame when an operation has actually been completed.
         * The operation needs to be matched based in the value of the receipt-id.
         *
         * This method allow watching for a receipt and invoke the callback
         * when corresponding receipt has been received.
         *
         * The actual {@link FrameImpl} will be passed as parameter to the callback.
         *
         * Example:
         * ```javascript
         *        // Subscribing with acknowledgement
         *        let receiptId = randomText();
         *
         *        client.watchForReceipt(receiptId, function() {
         *          // Will be called after server acknowledges
         *        });
         *
         *        client.subscribe(TEST.destination, onMessage, {receipt: receiptId});
         *
         *
         *        // Publishing with acknowledgement
         *        receiptId = randomText();
         *
         *        client.watchForReceipt(receiptId, function() {
         *          // Will be called after server acknowledges
         *        });
         *        client.publish({destination: TEST.destination, headers: {receipt: receiptId}, body: msg});
         * ```
         */
        Client.prototype.watchForReceipt = function (receiptId, callback) {
            this._stompHandler.watchForReceipt(receiptId, callback);
        };
        /**
         * Subscribe to a STOMP Broker location. The callback will be invoked for each received message with
         * the {@link IMessage} as argument.
         *
         * Note: The library will generate an unique ID if there is none provided in the headers.
         *       To use your own ID, pass it using the headers argument.
         *
         * ```javascript
         *        callback = function(message) {
         *        // called when the client receives a STOMP message from the server
         *          if (message.body) {
         *            alert("got message with body " + message.body)
         *          } else {
         *            alert("got empty message");
         *          }
         *        });
         *
         *        var subscription = client.subscribe("/queue/test", callback);
         *
         *        // Explicit subscription id
         *        var mySubId = 'my-subscription-id-001';
         *        var subscription = client.subscribe(destination, callback, { id: mySubId });
         * ```
         */
        Client.prototype.subscribe = function (destination, callback, headers) {
            if (headers === void 0) { headers = {}; }
            return this._stompHandler.subscribe(destination, callback, headers);
        };
        /**
         * It is preferable to unsubscribe from a subscription by calling
         * `unsubscribe()` directly on {@link StompSubscription} returned by `client.subscribe()`:
         *
         * ```javascript
         *        var subscription = client.subscribe(destination, onmessage);
         *        // ...
         *        subscription.unsubscribe();
         * ```
         *
         * See: http://stomp.github.com/stomp-specification-1.2.html#UNSUBSCRIBE UNSUBSCRIBE Frame
         */
        Client.prototype.unsubscribe = function (id, headers) {
            if (headers === void 0) { headers = {}; }
            this._stompHandler.unsubscribe(id, headers);
        };
        /**
         * Start a transaction, the returned {@link ITransaction} has methods - [commit]{@link ITransaction#commit}
         * and [abort]{@link ITransaction#abort}.
         *
         * `transactionId` is optional, if not passed the library will generate it internally.
         */
        Client.prototype.begin = function (transactionId) {
            return this._stompHandler.begin(transactionId);
        };
        /**
         * Commit a transaction.
         *
         * It is preferable to commit a transaction by calling [commit]{@link ITransaction#commit} directly on
         * {@link ITransaction} returned by [client.begin]{@link Client#begin}.
         *
         * ```javascript
         *        var tx = client.begin(txId);
         *        //...
         *        tx.commit();
         * ```
         */
        Client.prototype.commit = function (transactionId) {
            this._stompHandler.commit(transactionId);
        };
        /**
         * Abort a transaction.
         * It is preferable to abort a transaction by calling [abort]{@link ITransaction#abort} directly on
         * {@link ITransaction} returned by [client.begin]{@link Client#begin}.
         *
         * ```javascript
         *        var tx = client.begin(txId);
         *        //...
         *        tx.abort();
         * ```
         */
        Client.prototype.abort = function (transactionId) {
            this._stompHandler.abort(transactionId);
        };
        /**
         * ACK a message. It is preferable to acknowledge a message by calling [ack]{@link IMessage#ack} directly
         * on the {@link IMessage} handled by a subscription callback:
         *
         * ```javascript
         *        var callback = function (message) {
         *          // process the message
         *          // acknowledge it
         *          message.ack();
         *        };
         *        client.subscribe(destination, callback, {'ack': 'client'});
         * ```
         */
        Client.prototype.ack = function (messageId, subscriptionId, headers) {
            if (headers === void 0) { headers = {}; }
            this._stompHandler.ack(messageId, subscriptionId, headers);
        };
        /**
         * NACK a message. It is preferable to acknowledge a message by calling [nack]{@link IMessage#nack} directly
         * on the {@link IMessage} handled by a subscription callback:
         *
         * ```javascript
         *        var callback = function (message) {
         *          // process the message
         *          // an error occurs, nack it
         *          message.nack();
         *        };
         *        client.subscribe(destination, callback, {'ack': 'client'});
         * ```
         */
        Client.prototype.nack = function (messageId, subscriptionId, headers) {
            if (headers === void 0) { headers = {}; }
            this._stompHandler.nack(messageId, subscriptionId, headers);
        };
        return Client;
    }());
    exports.Client = Client;


    /***/ }),

    /***/ "./src/compatibility/compat-client.ts":
    /*!********************************************!*\
      !*** ./src/compatibility/compat-client.ts ***!
      \********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    var client_1 = __webpack_require__(/*! ../client */ "./src/client.ts");
    var heartbeat_info_1 = __webpack_require__(/*! ./heartbeat-info */ "./src/compatibility/heartbeat-info.ts");
    /**
     * Available for backward compatibility, please shift to using {@link Client}.
     *
     * **Deprecated**
     *
     * Part of `@stomp/stompjs`.
     *
     * To upgrade, please follow the [Upgrade Guide](../additional-documentation/upgrading.html)
     */
    var CompatClient = /** @class */ (function (_super) {
        __extends(CompatClient, _super);
        /**
         * Available for backward compatibility, please shift to using {@link Client}
         * and [Client#webSocketFactory]{@link Client#webSocketFactory}.
         *
         * **Deprecated**
         *
         * @internal
         */
        function CompatClient(webSocketFactory) {
            var _this = _super.call(this) || this;
            /**
             * It is no op now. No longer needed. Large packets work out of the box.
             */
            _this.maxWebSocketFrameSize = 16 * 1024;
            _this._heartbeatInfo = new heartbeat_info_1.HeartbeatInfo(_this);
            _this.reconnect_delay = 0;
            _this.webSocketFactory = webSocketFactory;
            // Default from previous version
            _this.debug = function () {
                var message = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    message[_i] = arguments[_i];
                }
                console.log.apply(console, message);
            };
            return _this;
        }
        CompatClient.prototype._parseConnect = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var closeEventCallback;
            var connectCallback;
            var errorCallback;
            var headers = {};
            if (args.length < 2) {
                throw new Error(('Connect requires at least 2 arguments'));
            }
            if (typeof (args[1]) === 'function') {
                headers = args[0], connectCallback = args[1], errorCallback = args[2], closeEventCallback = args[3];
            }
            else {
                switch (args.length) {
                    case 6:
                        headers.login = args[0], headers.passcode = args[1], connectCallback = args[2], errorCallback = args[3], closeEventCallback = args[4], headers.host = args[5];
                        break;
                    default:
                        headers.login = args[0], headers.passcode = args[1], connectCallback = args[2], errorCallback = args[3], closeEventCallback = args[4];
                }
            }
            return [headers, connectCallback, errorCallback, closeEventCallback];
        };
        /**
         * Available for backward compatibility, please shift to using [Client#activate]{@link Client#activate}.
         *
         * **Deprecated**
         *
         * The `connect` method accepts different number of arguments and types. See the Overloads list. Use the
         * version with headers to pass your broker specific options.
         *
         * overloads:
         * - connect(headers, connectCallback)
         * - connect(headers, connectCallback, errorCallback)
         * - connect(login, passcode, connectCallback)
         * - connect(login, passcode, connectCallback, errorCallback)
         * - connect(login, passcode, connectCallback, errorCallback, closeEventCallback)
         * - connect(login, passcode, connectCallback, errorCallback, closeEventCallback, host)
         *
         * params:
         * - headers, see [Client#connectHeaders]{@link Client#connectHeaders}
         * - connectCallback, see [Client#onConnect]{@link Client#onConnect}
         * - errorCallback, see [Client#onStompError]{@link Client#onStompError}
         * - closeEventCallback, see [Client#onWebSocketClose]{@link Client#onWebSocketClose}
         * - login [String], see [Client#connectHeaders](../classes/Client.html#connectHeaders)
         * - passcode [String], [Client#connectHeaders](../classes/Client.html#connectHeaders)
         * - host [String], see [Client#connectHeaders](../classes/Client.html#connectHeaders)
         *
         * To upgrade, please follow the [Upgrade Guide](../additional-documentation/upgrading.html)
         */
        CompatClient.prototype.connect = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var out = this._parseConnect.apply(this, args);
            if (out[0]) {
                this.connectHeaders = out[0];
            }
            if (out[1]) {
                this.onConnect = out[1];
            }
            if (out[2]) {
                this.onStompError = out[2];
            }
            if (out[3]) {
                this.onWebSocketClose = out[3];
            }
            _super.prototype.activate.call(this);
        };
        /**
         * Available for backward compatibility, please shift to using [Client#deactivate]{@link Client#deactivate}.
         *
         * **Deprecated**
         *
         * See:
         * [Client#onDisconnect]{@link Client#onDisconnect}, and
         * [Client#disconnectHeaders]{@link Client#disconnectHeaders}
         *
         * To upgrade, please follow the [Upgrade Guide](../additional-documentation/upgrading.html)
         */
        CompatClient.prototype.disconnect = function (disconnectCallback, headers) {
            if (headers === void 0) { headers = {}; }
            if (disconnectCallback) {
                this.onDisconnect = disconnectCallback;
            }
            this.disconnectHeaders = headers;
            _super.prototype.deactivate.call(this);
        };
        /**
         * Available for backward compatibility, use [Client#publish]{@link Client#publish}.
         *
         * Send a message to a named destination. Refer to your STOMP broker documentation for types
         * and naming of destinations. The headers will, typically, be available to the subscriber.
         * However, there may be special purpose headers corresponding to your STOMP broker.
         *
         *  **Deprecated**, use [Client#publish]{@link Client#publish}
         *
         * Note: Body must be String. You will need to covert the payload to string in case it is not string (e.g. JSON)
         *
         * ```javascript
         *        client.send("/queue/test", {priority: 9}, "Hello, STOMP");
         *
         *        // If you want to send a message with a body, you must also pass the headers argument.
         *        client.send("/queue/test", {}, "Hello, STOMP");
         * ```
         *
         * To upgrade, please follow the [Upgrade Guide](../additional-documentation/upgrading.html)
         */
        CompatClient.prototype.send = function (destination, headers, body) {
            if (headers === void 0) { headers = {}; }
            if (body === void 0) { body = ''; }
            headers = Object.assign({}, headers);
            var skipContentLengthHeader = (headers['content-length'] === false);
            if (skipContentLengthHeader) {
                delete headers['content-length'];
            }
            this.publish({
                destination: destination,
                headers: headers,
                body: body,
                skipContentLengthHeader: skipContentLengthHeader
            });
        };
        Object.defineProperty(CompatClient.prototype, "reconnect_delay", {
            /**
             * Available for backward compatibility, renamed to [Client#reconnectDelay]{@link Client#reconnectDelay}.
             *
             * **Deprecated**
             */
            set: function (value) {
                this.reconnectDelay = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompatClient.prototype, "ws", {
            /**
             * Available for backward compatibility, renamed to [Client#webSocket]{@link Client#webSocket}.
             *
             * **Deprecated**
             */
            get: function () {
                return this._webSocket;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompatClient.prototype, "version", {
            /**
             * Available for backward compatibility, renamed to [Client#connectedVersion]{@link Client#connectedVersion}.
             *
             * **Deprecated**
             */
            get: function () {
                return this.connectedVersion;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompatClient.prototype, "onreceive", {
            /**
             * Available for backward compatibility, renamed to [Client#onUnhandledMessage]{@link Client#onUnhandledMessage}.
             *
             * **Deprecated**
             */
            get: function () {
                return this.onUnhandledMessage;
            },
            /**
             * Available for backward compatibility, renamed to [Client#onUnhandledMessage]{@link Client#onUnhandledMessage}.
             *
             * **Deprecated**
             */
            set: function (value) {
                this.onUnhandledMessage = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompatClient.prototype, "onreceipt", {
            /**
             * Available for backward compatibility, renamed to [Client#onUnhandledReceipt]{@link Client#onUnhandledReceipt}.
             * Prefer using [Client#watchForReceipt]{@link Client#watchForReceipt}.
             *
             * **Deprecated**
             */
            get: function () {
                return this.onUnhandledReceipt;
            },
            /**
             * Available for backward compatibility, renamed to [Client#onUnhandledReceipt]{@link Client#onUnhandledReceipt}.
             *
             * **Deprecated**
             */
            set: function (value) {
                this.onUnhandledReceipt = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompatClient.prototype, "heartbeat", {
            /**
             * Available for backward compatibility, renamed to [Client#heartbeatIncoming]{@link Client#heartbeatIncoming}
             * [Client#heartbeatOutgoing]{@link Client#heartbeatOutgoing}.
             *
             * **Deprecated**
             */
            get: function () {
                return this._heartbeatInfo;
            },
            /**
             * Available for backward compatibility, renamed to [Client#heartbeatIncoming]{@link Client#heartbeatIncoming}
             * [Client#heartbeatOutgoing]{@link Client#heartbeatOutgoing}.
             *
             * **Deprecated**
             */
            set: function (value) {
                this.heartbeatIncoming = value.incoming;
                this.heartbeatOutgoing = value.outgoing;
            },
            enumerable: true,
            configurable: true
        });
        return CompatClient;
    }(client_1.Client));
    exports.CompatClient = CompatClient;


    /***/ }),

    /***/ "./src/compatibility/heartbeat-info.ts":
    /*!*********************************************!*\
      !*** ./src/compatibility/heartbeat-info.ts ***!
      \*********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Part of `@stomp/stompjs`.
     *
     * @internal
     */
    var HeartbeatInfo = /** @class */ (function () {
        function HeartbeatInfo(client) {
            this.client = client;
        }
        Object.defineProperty(HeartbeatInfo.prototype, "outgoing", {
            get: function () {
                return this.client.heartbeatOutgoing;
            },
            set: function (value) {
                this.client.heartbeatOutgoing = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HeartbeatInfo.prototype, "incoming", {
            get: function () {
                return this.client.heartbeatIncoming;
            },
            set: function (value) {
                this.client.heartbeatIncoming = value;
            },
            enumerable: true,
            configurable: true
        });
        return HeartbeatInfo;
    }());
    exports.HeartbeatInfo = HeartbeatInfo;


    /***/ }),

    /***/ "./src/compatibility/stomp.ts":
    /*!************************************!*\
      !*** ./src/compatibility/stomp.ts ***!
      \************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

    Object.defineProperty(exports, "__esModule", { value: true });
    var versions_1 = __webpack_require__(/*! ../versions */ "./src/versions.ts");
    var compat_client_1 = __webpack_require__(/*! ./compat-client */ "./src/compatibility/compat-client.ts");
    /**
     * STOMP Class, acts like a factory to create {@link Client}.
     *
     * Part of `@stomp/stompjs`.
     *
     * **Deprecated**
     *
     * It will be removed in next major version. Please switch to {@link Client}.
     */
    var Stomp = /** @class */ (function () {
        function Stomp() {
        }
        /**
         * This method creates a WebSocket client that is connected to
         * the STOMP server located at the url.
         *
         * ```javascript
         *        var url = "ws://localhost:61614/stomp";
         *        var client = Stomp.client(url);
         * ```
         *
         * **Deprecated**
         *
         * It will be removed in next major version. Please switch to {@link Client}
         * using [Client#brokerURL]{@link Client#brokerURL}.
         */
        Stomp.client = function (url, protocols) {
            // This is a hack to allow another implementation than the standard
            // HTML5 WebSocket class.
            //
            // It is possible to use another class by calling
            //
            //     Stomp.WebSocketClass = MozWebSocket
            //
            // *prior* to call `Stomp.client()`.
            //
            // This hack is deprecated and `Stomp.over()` method should be used
            // instead.
            // See remarks on the function Stomp.over
            if (protocols == null) {
                protocols = versions_1.Versions.default.protocolVersions();
            }
            var wsFn = function () {
                var klass = Stomp.WebSocketClass || WebSocket;
                return new klass(url, protocols);
            };
            return new compat_client_1.CompatClient(wsFn);
        };
        /**
         * This method is an alternative to [Stomp#client]{@link Stomp#client} to let the user
         * specify the WebSocket to use (either a standard HTML5 WebSocket or
         * a similar object).
         *
         * In order to support reconnection, the function Client._connect should be callable more than once.
         * While reconnecting
         * a new instance of underlying transport (TCP Socket, WebSocket or SockJS) will be needed. So, this function
         * alternatively allows passing a function that should return a new instance of the underlying socket.
         *
         * ```javascript
         *        var client = Stomp.over(function(){
         *          return new WebSocket('ws://localhost:15674/ws')
         *        });
         * ```
         *
         * **Deprecated**
         *
         * It will be removed in next major version. Please switch to {@link Client}
         * using [Client#webSocketFactory]{@link Client#webSocketFactory}.
         */
        Stomp.over = function (ws) {
            var wsFn;
            if (typeof (ws) === 'function') {
                wsFn = ws;
            }
            else {
                console.warn('Stomp.over did not receive a factory, auto reconnect will not work. ' +
                    'Please see https://stomp-js.github.io/api-docs/latest/classes/Stomp.html#over');
                wsFn = function () { return ws; };
            }
            return new compat_client_1.CompatClient(wsFn);
        };
        /**
         * In case you need to use a non standard class for WebSocket.
         *
         * For example when using within NodeJS environment:
         *
         * ```javascript
         *        StompJs = require('../../esm5/');
         *        Stomp = StompJs.Stomp;
         *        Stomp.WebSocketClass = require('websocket').w3cwebsocket;
         * ```
         *
         * **Deprecated**
         *
         *
         * It will be removed in next major version. Please switch to {@link Client}
         * using [Client#webSocketFactory]{@link Client#webSocketFactory}.
         */
        // tslint:disable-next-line:variable-name
        Stomp.WebSocketClass = null;
        return Stomp;
    }());
    exports.Stomp = Stomp;


    /***/ }),

    /***/ "./src/frame-impl.ts":
    /*!***************************!*\
      !*** ./src/frame-impl.ts ***!
      \***************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

    Object.defineProperty(exports, "__esModule", { value: true });
    var byte_1 = __webpack_require__(/*! ./byte */ "./src/byte.ts");
    /**
     * Frame class represents a STOMP frame.
     *
     * @internal
     */
    var FrameImpl = /** @class */ (function () {
        /**
         * Frame constructor. `command`, `headers` and `body` are available as properties.
         *
         * @internal
         */
        function FrameImpl(params) {
            var command = params.command, headers = params.headers, body = params.body, binaryBody = params.binaryBody, escapeHeaderValues = params.escapeHeaderValues, skipContentLengthHeader = params.skipContentLengthHeader;
            this.command = command;
            this.headers = Object.assign({}, headers || {});
            if (binaryBody) {
                this._binaryBody = binaryBody;
                this.isBinaryBody = true;
            }
            else {
                this._body = body || '';
                this.isBinaryBody = false;
            }
            this.escapeHeaderValues = escapeHeaderValues || false;
            this.skipContentLengthHeader = skipContentLengthHeader || false;
        }
        Object.defineProperty(FrameImpl.prototype, "body", {
            /**
             * body of the frame
             */
            get: function () {
                if (!this._body && this.isBinaryBody) {
                    this._body = new TextDecoder().decode(this._binaryBody);
                }
                return this._body;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FrameImpl.prototype, "binaryBody", {
            /**
             * body as Uint8Array
             */
            get: function () {
                if (!this._binaryBody && !this.isBinaryBody) {
                    this._binaryBody = new TextEncoder().encode(this._body);
                }
                return this._binaryBody;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * deserialize a STOMP Frame from raw data.
         *
         * @internal
         */
        FrameImpl.fromRawFrame = function (rawFrame, escapeHeaderValues) {
            var headers = {};
            var trim = function (str) { return str.replace(/^\s+|\s+$/g, ''); };
            // In case of repeated headers, as per standards, first value need to be used
            for (var _i = 0, _a = rawFrame.headers.reverse(); _i < _a.length; _i++) {
                var header = _a[_i];
                header.indexOf(':');
                var key = trim(header[0]);
                var value = trim(header[1]);
                if (escapeHeaderValues && (rawFrame.command !== 'CONNECT') && (rawFrame.command !== 'CONNECTED')) {
                    value = FrameImpl.hdrValueUnEscape(value);
                }
                headers[key] = value;
            }
            return new FrameImpl({
                command: rawFrame.command,
                headers: headers,
                binaryBody: rawFrame.binaryBody,
                escapeHeaderValues: escapeHeaderValues
            });
        };
        /**
         * @internal
         */
        FrameImpl.prototype.toString = function () {
            return this.serializeCmdAndHeaders();
        };
        /**
         * serialize this Frame in a format suitable to be passed to WebSocket.
         * If the body is string the output will be string.
         * If the body is binary (i.e. of type Unit8Array) it will be serialized to ArrayBuffer.
         *
         * @internal
         */
        FrameImpl.prototype.serialize = function () {
            var cmdAndHeaders = this.serializeCmdAndHeaders();
            if (this.isBinaryBody) {
                return FrameImpl.toUnit8Array(cmdAndHeaders, this._binaryBody).buffer;
            }
            else {
                return cmdAndHeaders + this._body + byte_1.BYTE.NULL;
            }
        };
        FrameImpl.prototype.serializeCmdAndHeaders = function () {
            var lines = [this.command];
            if (this.skipContentLengthHeader) {
                delete this.headers['content-length'];
            }
            for (var _i = 0, _a = Object.keys(this.headers || {}); _i < _a.length; _i++) {
                var name_1 = _a[_i];
                var value = this.headers[name_1];
                if (this.escapeHeaderValues && (this.command !== 'CONNECT') && (this.command !== 'CONNECTED')) {
                    lines.push(name_1 + ":" + FrameImpl.hdrValueEscape("" + value));
                }
                else {
                    lines.push(name_1 + ":" + value);
                }
            }
            if (this.isBinaryBody || (!this.isBodyEmpty() && !this.skipContentLengthHeader)) {
                lines.push("content-length:" + this.bodyLength());
            }
            return lines.join(byte_1.BYTE.LF) + byte_1.BYTE.LF + byte_1.BYTE.LF;
        };
        FrameImpl.prototype.isBodyEmpty = function () {
            return this.bodyLength() === 0;
        };
        FrameImpl.prototype.bodyLength = function () {
            var binaryBody = this.binaryBody;
            return binaryBody ? binaryBody.length : 0;
        };
        /**
         * Compute the size of a UTF-8 string by counting its number of bytes
         * (and not the number of characters composing the string)
         */
        FrameImpl.sizeOfUTF8 = function (s) {
            return s ? new TextEncoder().encode(s).length : 0;
        };
        FrameImpl.toUnit8Array = function (cmdAndHeaders, binaryBody) {
            var uint8CmdAndHeaders = new TextEncoder().encode(cmdAndHeaders);
            var nullTerminator = new Uint8Array([0]);
            var uint8Frame = new Uint8Array(uint8CmdAndHeaders.length + binaryBody.length + nullTerminator.length);
            uint8Frame.set(uint8CmdAndHeaders);
            uint8Frame.set(binaryBody, uint8CmdAndHeaders.length);
            uint8Frame.set(nullTerminator, uint8CmdAndHeaders.length + binaryBody.length);
            return uint8Frame;
        };
        /**
         * Serialize a STOMP frame as per STOMP standards, suitable to be sent to the STOMP broker.
         *
         * @internal
         */
        FrameImpl.marshall = function (params) {
            var frame = new FrameImpl(params);
            return frame.serialize();
        };
        /**
         *  Escape header values
         */
        FrameImpl.hdrValueEscape = function (str) {
            return str.replace(/\\/g, '\\\\').replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/:/g, '\\c');
        };
        /**
         * UnEscape header values
         */
        FrameImpl.hdrValueUnEscape = function (str) {
            return str.replace(/\\r/g, '\r').replace(/\\n/g, '\n').replace(/\\c/g, ':').replace(/\\\\/g, '\\');
        };
        return FrameImpl;
    }());
    exports.FrameImpl = FrameImpl;


    /***/ }),

    /***/ "./src/index.ts":
    /*!**********************!*\
      !*** ./src/index.ts ***!
      \**********************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(__webpack_require__(/*! ./client */ "./src/client.ts"));
    __export(__webpack_require__(/*! ./frame-impl */ "./src/frame-impl.ts"));
    __export(__webpack_require__(/*! ./parser */ "./src/parser.ts"));
    __export(__webpack_require__(/*! ./stomp-config */ "./src/stomp-config.ts"));
    __export(__webpack_require__(/*! ./stomp-headers */ "./src/stomp-headers.ts"));
    __export(__webpack_require__(/*! ./stomp-subscription */ "./src/stomp-subscription.ts"));
    __export(__webpack_require__(/*! ./versions */ "./src/versions.ts"));
    __export(__webpack_require__(/*! ./web-socket-state */ "./src/web-socket-state.ts"));
    // Compatibility code
    __export(__webpack_require__(/*! ./compatibility/compat-client */ "./src/compatibility/compat-client.ts"));
    __export(__webpack_require__(/*! ./compatibility/stomp */ "./src/compatibility/stomp.ts"));


    /***/ }),

    /***/ "./src/parser.ts":
    /*!***********************!*\
      !*** ./src/parser.ts ***!
      \***********************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @internal
     */
    var NULL = 0;
    /**
     * @internal
     */
    var LF = 10;
    /**
     * @internal
     */
    var CR = 13;
    /**
     * @internal
     */
    var COLON = 58;
    /**
     * This is an evented, rec descent parser.
     * A stream of Octets can be passed and whenever it recognizes
     * a complete Frame or an incoming ping it will invoke the registered callbacks.
     *
     * All incoming Octets are fed into _onByte function.
     * Depending on current state the _onByte function keeps changing.
     * Depending on the state it keeps accumulating into _token and _results.
     * State is indicated by current value of _onByte, all states are named as _collect.
     *
     * STOMP standards https://stomp.github.io/stomp-specification-1.2.html
     * imply that all lengths are considered in bytes (instead of string lengths).
     * So, before actual parsing, if the incoming data is String it is converted to Octets.
     * This allows faithful implementation of the protocol and allows NULL Octets to be present in the body.
     *
     * There is no peek function on the incoming data.
     * When a state change occurs based on an Octet without consuming the Octet,
     * the Octet, after state change, is fed again (_reinjectByte).
     * This became possible as the state change can be determined by inspecting just one Octet.
     *
     * There are two modes to collect the body, if content-length header is there then it by counting Octets
     * otherwise it is determined by NULL terminator.
     *
     * Following the standards, the command and headers are converted to Strings
     * and the body is returned as Octets.
     * Headers are returned as an array and not as Hash - to allow multiple occurrence of an header.
     *
     * This parser does not use Regular Expressions as that can only operate on Strings.
     *
     * It handles if multiple STOMP frames are given as one chunk, a frame is split into multiple chunks, or
     * any combination there of. The parser remembers its state (any partial frame) and continues when a new chunk
     * is pushed.
     *
     * Typically the higher level function will convert headers to Hash, handle unescaping of header values
     * (which is protocol version specific), and convert body to text.
     *
     * Check the parser.spec.js to understand cases that this parser is supposed to handle.
     *
     * Part of `@stomp/stompjs`.
     *
     * @internal
     */
    var Parser = /** @class */ (function () {
        function Parser(onFrame, onIncomingPing) {
            this.onFrame = onFrame;
            this.onIncomingPing = onIncomingPing;
            this._encoder = new TextEncoder();
            this._decoder = new TextDecoder();
            this._token = [];
            this._initState();
        }
        Parser.prototype.parseChunk = function (segment, appendMissingNULLonIncoming) {
            if (appendMissingNULLonIncoming === void 0) { appendMissingNULLonIncoming = false; }
            var chunk;
            if ((segment instanceof ArrayBuffer)) {
                chunk = new Uint8Array(segment);
            }
            else {
                chunk = this._encoder.encode(segment);
            }
            // See https://github.com/stomp-js/stompjs/issues/89
            // Remove when underlying issue is fixed.
            //
            // Send a NULL byte, if the last byte of a Text frame was not NULL.F
            if (appendMissingNULLonIncoming && chunk[chunk.length - 1] !== 0) {
                var chunkWithNull = new Uint8Array(chunk.length + 1);
                chunkWithNull.set(chunk, 0);
                chunkWithNull[chunk.length] = 0;
                chunk = chunkWithNull;
            }
            // tslint:disable-next-line:prefer-for-of
            for (var i = 0; i < chunk.length; i++) {
                var byte = chunk[i];
                this._onByte(byte);
            }
        };
        // The following implements a simple Rec Descent Parser.
        // The grammar is simple and just one byte tells what should be the next state
        Parser.prototype._collectFrame = function (byte) {
            if (byte === NULL) { // Ignore
                return;
            }
            if (byte === CR) { // Ignore CR
                return;
            }
            if (byte === LF) { // Incoming Ping
                this.onIncomingPing();
                return;
            }
            this._onByte = this._collectCommand;
            this._reinjectByte(byte);
        };
        Parser.prototype._collectCommand = function (byte) {
            if (byte === CR) { // Ignore CR
                return;
            }
            if (byte === LF) {
                this._results.command = this._consumeTokenAsUTF8();
                this._onByte = this._collectHeaders;
                return;
            }
            this._consumeByte(byte);
        };
        Parser.prototype._collectHeaders = function (byte) {
            if (byte === CR) { // Ignore CR
                return;
            }
            if (byte === LF) {
                this._setupCollectBody();
                return;
            }
            this._onByte = this._collectHeaderKey;
            this._reinjectByte(byte);
        };
        Parser.prototype._reinjectByte = function (byte) {
            this._onByte(byte);
        };
        Parser.prototype._collectHeaderKey = function (byte) {
            if (byte === COLON) {
                this._headerKey = this._consumeTokenAsUTF8();
                this._onByte = this._collectHeaderValue;
                return;
            }
            this._consumeByte(byte);
        };
        Parser.prototype._collectHeaderValue = function (byte) {
            if (byte === CR) { // Ignore CR
                return;
            }
            if (byte === LF) {
                this._results.headers.push([this._headerKey, this._consumeTokenAsUTF8()]);
                this._headerKey = undefined;
                this._onByte = this._collectHeaders;
                return;
            }
            this._consumeByte(byte);
        };
        Parser.prototype._setupCollectBody = function () {
            var contentLengthHeader = this._results.headers.filter(function (header) {
                return header[0] === 'content-length';
            })[0];
            if (contentLengthHeader) {
                this._bodyBytesRemaining = parseInt(contentLengthHeader[1], 10);
                this._onByte = this._collectBodyFixedSize;
            }
            else {
                this._onByte = this._collectBodyNullTerminated;
            }
        };
        Parser.prototype._collectBodyNullTerminated = function (byte) {
            if (byte === NULL) {
                this._retrievedBody();
                return;
            }
            this._consumeByte(byte);
        };
        Parser.prototype._collectBodyFixedSize = function (byte) {
            // It is post decrement, so that we discard the trailing NULL octet
            if (this._bodyBytesRemaining-- === 0) {
                this._retrievedBody();
                return;
            }
            this._consumeByte(byte);
        };
        Parser.prototype._retrievedBody = function () {
            this._results.binaryBody = this._consumeTokenAsRaw();
            this.onFrame(this._results);
            this._initState();
        };
        // Rec Descent Parser helpers
        Parser.prototype._consumeByte = function (byte) {
            this._token.push(byte);
        };
        Parser.prototype._consumeTokenAsUTF8 = function () {
            return this._decoder.decode(this._consumeTokenAsRaw());
        };
        Parser.prototype._consumeTokenAsRaw = function () {
            var rawResult = new Uint8Array(this._token);
            this._token = [];
            return rawResult;
        };
        Parser.prototype._initState = function () {
            this._results = {
                command: undefined,
                headers: [],
                binaryBody: undefined
            };
            this._token = [];
            this._headerKey = undefined;
            this._onByte = this._collectFrame;
        };
        return Parser;
    }());
    exports.Parser = Parser;


    /***/ }),

    /***/ "./src/stomp-config.ts":
    /*!*****************************!*\
      !*** ./src/stomp-config.ts ***!
      \*****************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Configuration options for STOMP Client, each key corresponds to
     * field by the same name in {@link Client}. This can be passed to
     * the constructor of {@link Client} or to [Client#configure]{@link Client#configure}.
     *
     * Part of `@stomp/stompjs`.
     */
    var StompConfig = /** @class */ (function () {
        function StompConfig() {
        }
        return StompConfig;
    }());
    exports.StompConfig = StompConfig;


    /***/ }),

    /***/ "./src/stomp-handler.ts":
    /*!******************************!*\
      !*** ./src/stomp-handler.ts ***!
      \******************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

    Object.defineProperty(exports, "__esModule", { value: true });
    var byte_1 = __webpack_require__(/*! ./byte */ "./src/byte.ts");
    var frame_impl_1 = __webpack_require__(/*! ./frame-impl */ "./src/frame-impl.ts");
    var parser_1 = __webpack_require__(/*! ./parser */ "./src/parser.ts");
    var versions_1 = __webpack_require__(/*! ./versions */ "./src/versions.ts");
    var web_socket_state_1 = __webpack_require__(/*! ./web-socket-state */ "./src/web-socket-state.ts");
    /**
     * The STOMP protocol handler
     *
     * Part of `@stomp/stompjs`.
     *
     * @internal
     */
    var StompHandler = /** @class */ (function () {
        function StompHandler(_client, _webSocket, config) {
            var _this = this;
            if (config === void 0) { config = {}; }
            this._client = _client;
            this._webSocket = _webSocket;
            this._serverFrameHandlers = {
                // [CONNECTED Frame](http://stomp.github.com/stomp-specification-1.2.html#CONNECTED_Frame)
                CONNECTED: function (frame) {
                    _this.debug("connected to server " + frame.headers.server);
                    _this._connected = true;
                    _this._connectedVersion = frame.headers.version;
                    // STOMP version 1.2 needs header values to be escaped
                    if (_this._connectedVersion === versions_1.Versions.V1_2) {
                        _this._escapeHeaderValues = true;
                    }
                    _this._setupHeartbeat(frame.headers);
                    _this.onConnect(frame);
                },
                // [MESSAGE Frame](http://stomp.github.com/stomp-specification-1.2.html#MESSAGE)
                MESSAGE: function (frame) {
                    // the callback is registered when the client calls
                    // `subscribe()`.
                    // If there is no registered subscription for the received message,
                    // the default `onUnhandledMessage` callback is used that the client can set.
                    // This is useful for subscriptions that are automatically created
                    // on the browser side (e.g. [RabbitMQ's temporary
                    // queues](http://www.rabbitmq.com/stomp.html)).
                    var subscription = frame.headers.subscription;
                    var onReceive = _this._subscriptions[subscription] || _this.onUnhandledMessage;
                    // bless the frame to be a Message
                    var message = frame;
                    var client = _this;
                    var messageId = _this._connectedVersion === versions_1.Versions.V1_2 ? message.headers.ack : message.headers['message-id'];
                    // add `ack()` and `nack()` methods directly to the returned frame
                    // so that a simple call to `message.ack()` can acknowledge the message.
                    message.ack = function (headers) {
                        if (headers === void 0) { headers = {}; }
                        return client.ack(messageId, subscription, headers);
                    };
                    message.nack = function (headers) {
                        if (headers === void 0) { headers = {}; }
                        return client.nack(messageId, subscription, headers);
                    };
                    onReceive(message);
                },
                // [RECEIPT Frame](http://stomp.github.com/stomp-specification-1.2.html#RECEIPT)
                RECEIPT: function (frame) {
                    var callback = _this._receiptWatchers[frame.headers['receipt-id']];
                    if (callback) {
                        callback(frame);
                        // Server will acknowledge only once, remove the callback
                        delete _this._receiptWatchers[frame.headers['receipt-id']];
                    }
                    else {
                        _this.onUnhandledReceipt(frame);
                    }
                },
                // [ERROR Frame](http://stomp.github.com/stomp-specification-1.2.html#ERROR)
                ERROR: function (frame) {
                    _this.onStompError(frame);
                }
            };
            // used to index subscribers
            this._counter = 0;
            // subscription callbacks indexed by subscriber's ID
            this._subscriptions = {};
            // receipt-watchers indexed by receipts-ids
            this._receiptWatchers = {};
            this._partialData = '';
            this._escapeHeaderValues = false;
            this._lastServerActivityTS = Date.now();
            this.configure(config);
        }
        Object.defineProperty(StompHandler.prototype, "connectedVersion", {
            get: function () {
                return this._connectedVersion;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StompHandler.prototype, "connected", {
            get: function () {
                return this._connected;
            },
            enumerable: true,
            configurable: true
        });
        StompHandler.prototype.configure = function (conf) {
            // bulk assign all properties to this
            Object.assign(this, conf);
        };
        StompHandler.prototype.start = function () {
            var _this = this;
            var parser = new parser_1.Parser(
            // On Frame
            function (rawFrame) {
                var frame = frame_impl_1.FrameImpl.fromRawFrame(rawFrame, _this._escapeHeaderValues);
                // if this.logRawCommunication is set, the rawChunk is logged at this._webSocket.onmessage
                if (!_this.logRawCommunication) {
                    _this.debug("<<< " + frame);
                }
                var serverFrameHandler = _this._serverFrameHandlers[frame.command] || _this.onUnhandledFrame;
                serverFrameHandler(frame);
            }, 
            // On Incoming Ping
            function () {
                _this.debug('<<< PONG');
            });
            this._webSocket.onmessage = function (evt) {
                _this.debug('Received data');
                _this._lastServerActivityTS = Date.now();
                if (_this.logRawCommunication) {
                    var rawChunkAsString = (evt.data instanceof ArrayBuffer) ? new TextDecoder().decode(evt.data) : evt.data;
                    _this.debug("<<< " + rawChunkAsString);
                }
                parser.parseChunk(evt.data, _this.appendMissingNULLonIncoming);
            };
            this._webSocket.onclose = function (closeEvent) {
                _this.debug("Connection closed to " + _this._webSocket.url);
                _this.onWebSocketClose(closeEvent);
                _this._cleanUp();
            };
            this._webSocket.onerror = function (errorEvent) {
                _this.onWebSocketError(errorEvent);
            };
            this._webSocket.onopen = function () {
                // Clone before updating
                var connectHeaders = Object.assign({}, _this.connectHeaders);
                _this.debug('Web Socket Opened...');
                connectHeaders['accept-version'] = _this.stompVersions.supportedVersions();
                connectHeaders['heart-beat'] = [_this.heartbeatOutgoing, _this.heartbeatIncoming].join(',');
                _this._transmit({ command: 'CONNECT', headers: connectHeaders });
            };
        };
        StompHandler.prototype._setupHeartbeat = function (headers) {
            var _this = this;
            if ((headers.version !== versions_1.Versions.V1_1 && headers.version !== versions_1.Versions.V1_2)) {
                return;
            }
            // It is valid for the server to not send this header
            // https://stomp.github.io/stomp-specification-1.2.html#Heart-beating
            if (!headers['heart-beat']) {
                return;
            }
            // heart-beat header received from the server looks like:
            //
            //     heart-beat: sx, sy
            var _a = (headers['heart-beat']).split(',').map(function (v) { return parseInt(v, 10); }), serverOutgoing = _a[0], serverIncoming = _a[1];
            if ((this.heartbeatOutgoing !== 0) && (serverIncoming !== 0)) {
                var ttl = Math.max(this.heartbeatOutgoing, serverIncoming);
                this.debug("send PING every " + ttl + "ms");
                this._pinger = setInterval(function () {
                    if (_this._webSocket.readyState === web_socket_state_1.WebSocketState.OPEN) {
                        _this._webSocket.send(byte_1.BYTE.LF);
                        _this.debug('>>> PING');
                    }
                }, ttl);
            }
            if ((this.heartbeatIncoming !== 0) && (serverOutgoing !== 0)) {
                var ttl_1 = Math.max(this.heartbeatIncoming, serverOutgoing);
                this.debug("check PONG every " + ttl_1 + "ms");
                this._ponger = setInterval(function () {
                    var delta = Date.now() - _this._lastServerActivityTS;
                    // We wait twice the TTL to be flexible on window's setInterval calls
                    if (delta > (ttl_1 * 2)) {
                        _this.debug("did not receive server activity for the last " + delta + "ms");
                        _this._closeWebsocket();
                    }
                }, ttl_1);
            }
        };
        StompHandler.prototype._closeWebsocket = function () {
            this._webSocket.onmessage = function () { }; // ignore messages
            this._webSocket.close();
        };
        StompHandler.prototype._transmit = function (params) {
            var command = params.command, headers = params.headers, body = params.body, binaryBody = params.binaryBody, skipContentLengthHeader = params.skipContentLengthHeader;
            var frame = new frame_impl_1.FrameImpl({
                command: command,
                headers: headers,
                body: body,
                binaryBody: binaryBody,
                escapeHeaderValues: this._escapeHeaderValues,
                skipContentLengthHeader: skipContentLengthHeader
            });
            var rawChunk = frame.serialize();
            if (this.logRawCommunication) {
                this.debug(">>> " + rawChunk);
            }
            else {
                this.debug(">>> " + frame);
            }
            if (this.forceBinaryWSFrames && typeof rawChunk === 'string') {
                rawChunk = new TextEncoder().encode(rawChunk);
            }
            if (typeof rawChunk !== 'string' || !this.splitLargeFrames) {
                this._webSocket.send(rawChunk);
            }
            else {
                var out = rawChunk;
                while (out.length > 0) {
                    var chunk = out.substring(0, this.maxWebSocketChunkSize);
                    out = out.substring(this.maxWebSocketChunkSize);
                    this._webSocket.send(chunk);
                    this.debug("chunk sent = " + chunk.length + ", remaining = " + out.length);
                }
            }
        };
        StompHandler.prototype.dispose = function () {
            var _this = this;
            if (this.connected) {
                try {
                    // clone before updating
                    var disconnectHeaders = Object.assign({}, this.disconnectHeaders);
                    if (!disconnectHeaders.receipt) {
                        disconnectHeaders.receipt = "close-" + this._counter++;
                    }
                    this.watchForReceipt(disconnectHeaders.receipt, function (frame) {
                        _this._closeWebsocket();
                        _this._cleanUp();
                        _this.onDisconnect(frame);
                    });
                    this._transmit({ command: 'DISCONNECT', headers: disconnectHeaders });
                }
                catch (error) {
                    this.debug("Ignoring error during disconnect " + error);
                }
            }
            else {
                if (this._webSocket.readyState === web_socket_state_1.WebSocketState.CONNECTING
                    || this._webSocket.readyState === web_socket_state_1.WebSocketState.OPEN) {
                    this._closeWebsocket();
                }
            }
        };
        StompHandler.prototype._cleanUp = function () {
            this._connected = false;
            if (this._pinger) {
                clearInterval(this._pinger);
            }
            if (this._ponger) {
                clearInterval(this._ponger);
            }
        };
        StompHandler.prototype.publish = function (params) {
            var destination = params.destination, headers = params.headers, body = params.body, binaryBody = params.binaryBody, skipContentLengthHeader = params.skipContentLengthHeader;
            var hdrs = Object.assign({ destination: destination }, headers);
            this._transmit({
                command: 'SEND',
                headers: hdrs,
                body: body,
                binaryBody: binaryBody,
                skipContentLengthHeader: skipContentLengthHeader
            });
        };
        StompHandler.prototype.watchForReceipt = function (receiptId, callback) {
            this._receiptWatchers[receiptId] = callback;
        };
        StompHandler.prototype.subscribe = function (destination, callback, headers) {
            if (headers === void 0) { headers = {}; }
            headers = Object.assign({}, headers);
            if (!headers.id) {
                headers.id = "sub-" + this._counter++;
            }
            headers.destination = destination;
            this._subscriptions[headers.id] = callback;
            this._transmit({ command: 'SUBSCRIBE', headers: headers });
            var client = this;
            return {
                id: headers.id,
                unsubscribe: function (hdrs) {
                    return client.unsubscribe(headers.id, hdrs);
                }
            };
        };
        StompHandler.prototype.unsubscribe = function (id, headers) {
            if (headers === void 0) { headers = {}; }
            headers = Object.assign({}, headers);
            delete this._subscriptions[id];
            headers.id = id;
            this._transmit({ command: 'UNSUBSCRIBE', headers: headers });
        };
        StompHandler.prototype.begin = function (transactionId) {
            var txId = transactionId || ("tx-" + this._counter++);
            this._transmit({
                command: 'BEGIN', headers: {
                    transaction: txId
                }
            });
            var client = this;
            return {
                id: txId,
                commit: function () {
                    client.commit(txId);
                },
                abort: function () {
                    client.abort(txId);
                }
            };
        };
        StompHandler.prototype.commit = function (transactionId) {
            this._transmit({
                command: 'COMMIT', headers: {
                    transaction: transactionId
                }
            });
        };
        StompHandler.prototype.abort = function (transactionId) {
            this._transmit({
                command: 'ABORT', headers: {
                    transaction: transactionId
                }
            });
        };
        StompHandler.prototype.ack = function (messageId, subscriptionId, headers) {
            if (headers === void 0) { headers = {}; }
            headers = Object.assign({}, headers);
            if (this._connectedVersion === versions_1.Versions.V1_2) {
                headers.id = messageId;
            }
            else {
                headers['message-id'] = messageId;
            }
            headers.subscription = subscriptionId;
            this._transmit({ command: 'ACK', headers: headers });
        };
        StompHandler.prototype.nack = function (messageId, subscriptionId, headers) {
            if (headers === void 0) { headers = {}; }
            headers = Object.assign({}, headers);
            if (this._connectedVersion === versions_1.Versions.V1_2) {
                headers.id = messageId;
            }
            else {
                headers['message-id'] = messageId;
            }
            headers.subscription = subscriptionId;
            return this._transmit({ command: 'NACK', headers: headers });
        };
        return StompHandler;
    }());
    exports.StompHandler = StompHandler;


    /***/ }),

    /***/ "./src/stomp-headers.ts":
    /*!******************************!*\
      !*** ./src/stomp-headers.ts ***!
      \******************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * STOMP headers. Many functions calls will accept headers as parameters.
     * The headers sent by Broker will be available as [IFrame#headers]{@link IFrame#headers}.
     *
     * `key` and `value` must be valid strings.
     * In addition, `key` must not contain `CR`, `LF`, or `:`.
     *
     * Part of `@stomp/stompjs`.
     */
    var StompHeaders = /** @class */ (function () {
        function StompHeaders() {
        }
        return StompHeaders;
    }());
    exports.StompHeaders = StompHeaders;


    /***/ }),

    /***/ "./src/stomp-subscription.ts":
    /*!***********************************!*\
      !*** ./src/stomp-subscription.ts ***!
      \***********************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Call [Client#subscribe]{@link Client#subscribe} to create a StompSubscription.
     *
     * Part of `@stomp/stompjs`.
     */
    var StompSubscription = /** @class */ (function () {
        function StompSubscription() {
        }
        return StompSubscription;
    }());
    exports.StompSubscription = StompSubscription;


    /***/ }),

    /***/ "./src/versions.ts":
    /*!*************************!*\
      !*** ./src/versions.ts ***!
      \*************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Supported STOMP versions
     *
     * Part of `@stomp/stompjs`.
     */
    var Versions = /** @class */ (function () {
        /**
         * Takes an array of string of versions, typical elements '1.0', '1.1', or '1.2'
         *
         * You will an instance if this class if you want to override supported versions to be declared during
         * STOMP handshake.
         */
        function Versions(versions) {
            this.versions = versions;
        }
        /**
         * Used as part of CONNECT STOMP Frame
         */
        Versions.prototype.supportedVersions = function () {
            return this.versions.join(',');
        };
        /**
         * Used while creating a WebSocket
         */
        Versions.prototype.protocolVersions = function () {
            return this.versions.map(function (x) { return "v" + x.replace('.', '') + ".stomp"; });
        };
        /**
         * Indicates protocol version 1.0
         */
        Versions.V1_0 = '1.0';
        /**
         * Indicates protocol version 1.1
         */
        Versions.V1_1 = '1.1';
        /**
         * Indicates protocol version 1.2
         */
        Versions.V1_2 = '1.2';
        /**
         * @internal
         */
        Versions.default = new Versions([Versions.V1_0, Versions.V1_1, Versions.V1_2]);
        return Versions;
    }());
    exports.Versions = Versions;


    /***/ }),

    /***/ "./src/web-socket-state.ts":
    /*!*********************************!*\
      !*** ./src/web-socket-state.ts ***!
      \*********************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

    Object.defineProperty(exports, "__esModule", { value: true });
    (function (WebSocketState) {
        WebSocketState[WebSocketState["CONNECTING"] = 0] = "CONNECTING";
        WebSocketState[WebSocketState["OPEN"] = 1] = "OPEN";
        WebSocketState[WebSocketState["CLOSING"] = 2] = "CLOSING";
        WebSocketState[WebSocketState["CLOSED"] = 3] = "CLOSED";
    })(exports.WebSocketState || (exports.WebSocketState = {}));


    /***/ }),

    /***/ 0:
    /*!****************************!*\
      !*** multi ./src/index.ts ***!
      \****************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {

    module.exports = __webpack_require__(/*! /home/kdeepak/MyWork/Tech/stomp/stompjs/src/index.ts */"./src/index.ts");


    /***/ })

    /******/ });
    });

    }(stomp_umd));

    var StompJs = /*@__PURE__*/getDefaultExportFromCjs(stomp_umd.exports);

    var lib$1 = {exports: {}};

    // Found this seed-based random generator somewhere
    // Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

    var seed = 1;

    /**
     * return a random number based on a seed
     * @param seed
     * @returns {number}
     */
    function getNextValue() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed/(233280.0);
    }

    function setSeed$1(_seed_) {
        seed = _seed_;
    }

    var randomFromSeed$1 = {
        nextValue: getNextValue,
        seed: setSeed$1
    };

    var randomFromSeed = randomFromSeed$1;

    var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
    var alphabet$2;
    var previousSeed;

    var shuffled;

    function reset() {
        shuffled = false;
    }

    function setCharacters(_alphabet_) {
        if (!_alphabet_) {
            if (alphabet$2 !== ORIGINAL) {
                alphabet$2 = ORIGINAL;
                reset();
            }
            return;
        }

        if (_alphabet_ === alphabet$2) {
            return;
        }

        if (_alphabet_.length !== ORIGINAL.length) {
            throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
        }

        var unique = _alphabet_.split('').filter(function(item, ind, arr){
           return ind !== arr.lastIndexOf(item);
        });

        if (unique.length) {
            throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
        }

        alphabet$2 = _alphabet_;
        reset();
    }

    function characters(_alphabet_) {
        setCharacters(_alphabet_);
        return alphabet$2;
    }

    function setSeed(seed) {
        randomFromSeed.seed(seed);
        if (previousSeed !== seed) {
            reset();
            previousSeed = seed;
        }
    }

    function shuffle() {
        if (!alphabet$2) {
            setCharacters(ORIGINAL);
        }

        var sourceArray = alphabet$2.split('');
        var targetArray = [];
        var r = randomFromSeed.nextValue();
        var characterIndex;

        while (sourceArray.length > 0) {
            r = randomFromSeed.nextValue();
            characterIndex = Math.floor(r * sourceArray.length);
            targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
        }
        return targetArray.join('');
    }

    function getShuffled() {
        if (shuffled) {
            return shuffled;
        }
        shuffled = shuffle();
        return shuffled;
    }

    /**
     * lookup shuffled letter
     * @param index
     * @returns {string}
     */
    function lookup(index) {
        var alphabetShuffled = getShuffled();
        return alphabetShuffled[index];
    }

    function get () {
      return alphabet$2 || ORIGINAL;
    }

    var alphabet_1 = {
        get: get,
        characters: characters,
        seed: setSeed,
        lookup: lookup,
        shuffled: getShuffled
    };

    var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

    var randomByte;

    if (!crypto || !crypto.getRandomValues) {
        randomByte = function(size) {
            var bytes = [];
            for (var i = 0; i < size; i++) {
                bytes.push(Math.floor(Math.random() * 256));
            }
            return bytes;
        };
    } else {
        randomByte = function(size) {
            return crypto.getRandomValues(new Uint8Array(size));
        };
    }

    var randomByteBrowser = randomByte;

    // This file replaces `format.js` in bundlers like webpack or Rollup,
    // according to `browser` config in `package.json`.

    var format_browser = function (random, alphabet, size) {
      // We can’t use bytes bigger than the alphabet. To make bytes values closer
      // to the alphabet, we apply bitmask on them. We look for the closest
      // `2 ** x - 1` number, which will be bigger than alphabet size. If we have
      // 30 symbols in the alphabet, we will take 31 (00011111).
      // We do not use faster Math.clz32, because it is not available in browsers.
      var mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1;
      // Bitmask is not a perfect solution (in our example it will pass 31 bytes,
      // which is bigger than the alphabet). As a result, we will need more bytes,
      // than ID size, because we will refuse bytes bigger than the alphabet.

      // Every hardware random generator call is costly,
      // because we need to wait for entropy collection. This is why often it will
      // be faster to ask for few extra bytes in advance, to avoid additional calls.

      // Here we calculate how many random bytes should we call in advance.
      // It depends on ID length, mask / alphabet size and magic number 1.6
      // (which was selected according benchmarks).

      // -~f => Math.ceil(f) if n is float number
      // -~i => i + 1 if n is integer number
      var step = -~(1.6 * mask * size / alphabet.length);
      var id = '';

      while (true) {
        var bytes = random(step);
        // Compact alternative for `for (var i = 0; i < step; i++)`
        var i = step;
        while (i--) {
          // If random byte is bigger than alphabet even after bitmask,
          // we refuse it by `|| ''`.
          id += alphabet[bytes[i] & mask] || '';
          // More compact than `id.length + 1 === size`
          if (id.length === +size) return id
        }
      }
    };

    var alphabet$1 = alphabet_1;
    var random = randomByteBrowser;
    var format = format_browser;

    function generate$1(number) {
        var loopCounter = 0;
        var done;

        var str = '';

        while (!done) {
            str = str + format(random, alphabet$1.get(), 1);
            done = number < (Math.pow(16, loopCounter + 1 ) );
            loopCounter++;
        }
        return str;
    }

    var generate_1 = generate$1;

    var generate = generate_1;

    // Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
    // This number should be updated every year or so to keep the generated id short.
    // To regenerate `new Date() - 0` and bump the version. Always bump the version!
    var REDUCE_TIME = 1567752802062;

    // don't change unless we change the algos or REDUCE_TIME
    // must be an integer and less than 16
    var version = 7;

    // Counter is used when shortid is called multiple times in one second.
    var counter;

    // Remember the last time shortid was called in case counter is needed.
    var previousSeconds;

    /**
     * Generate unique id
     * Returns string id
     */
    function build(clusterWorkerId) {
        var str = '';

        var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

        if (seconds === previousSeconds) {
            counter++;
        } else {
            counter = 0;
            previousSeconds = seconds;
        }

        str = str + generate(version);
        str = str + generate(clusterWorkerId);
        if (counter > 0) {
            str = str + generate(counter);
        }
        str = str + generate(seconds);
        return str;
    }

    var build_1 = build;

    var alphabet = alphabet_1;

    function isShortId(id) {
        if (!id || typeof id !== 'string' || id.length < 6 ) {
            return false;
        }

        var nonAlphabetic = new RegExp('[^' +
          alphabet.get().replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&') +
        ']');
        return !nonAlphabetic.test(id);
    }

    var isValid = isShortId;

    (function (module) {

    var alphabet = alphabet_1;
    var build = build_1;
    var isValid$1 = isValid;

    // if you are using cluster or multiple servers use this to make each instance
    // has a unique value for worker
    // Note: I don't know if this is automatically set when using third
    // party cluster solutions such as pm2.
    var clusterWorkerId = 0;

    /**
     * Set the seed.
     * Highly recommended if you don't want people to try to figure out your id schema.
     * exposed as shortid.seed(int)
     * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
     */
    function seed(seedValue) {
        alphabet.seed(seedValue);
        return module.exports;
    }

    /**
     * Set the cluster worker or machine id
     * exposed as shortid.worker(int)
     * @param workerId worker must be positive integer.  Number less than 16 is recommended.
     * returns shortid module so it can be chained.
     */
    function worker(workerId) {
        clusterWorkerId = workerId;
        return module.exports;
    }

    /**
     *
     * sets new characters to use in the alphabet
     * returns the shuffled alphabet
     */
    function characters(newCharacters) {
        if (newCharacters !== undefined) {
            alphabet.characters(newCharacters);
        }

        return alphabet.shuffled();
    }

    /**
     * Generate unique id
     * Returns string id
     */
    function generate() {
      return build(clusterWorkerId);
    }

    // Export all other functions as properties of the generate function
    module.exports = generate;
    module.exports.generate = generate;
    module.exports.seed = seed;
    module.exports.worker = worker;
    module.exports.characters = characters;
    module.exports.isValid = isValid$1;
    }(lib$1));

    var shortid = lib$1.exports;

    class GlueController {
        constructor(glue, providersController) {
            this.glue = glue;
            this.providersController = providersController;
            this.handlers = {
                "snooze": { execute: this.handleNotificationSnooze.bind(this), payloadDecoder: snoozeConfigDecoder }
            };
        }
        start(config) {
            return __awaiter(this, void 0, void 0, function* () {
                this.gnsConfig = config;
                const [notificationsStream, getNotificationsStream] = yield Promise.all([
                    this.glue.interop.createStream(gnsNotificationsStreamName, {
                        subscriptionRequestHandler: this.onNotificationsSubRequested.bind(this),
                        subscriptionAddedHandler: this.onNotificationsSubAdded.bind(this)
                    }),
                    this.glue.interop.createStream(gnsGetNotificationsStreamName, {
                        subscriptionRequestHandler: this.onNotificationsSubRequested.bind(this),
                        subscriptionAddedHandler: this.onNotificationsSubAdded.bind(this)
                    }),
                    this.glue.interop.registerAsync(gnsControlMethodName, this.handleControlMessage.bind(this))
                ]);
                this.notificationsStream = notificationsStream;
                this.getNotificationsStream = getNotificationsStream;
                this.providersController.onNotificationCancellation((message) => {
                    this.pushNotificationToStream(message);
                });
                this.providersController.onNotification((message) => {
                    this.pushNotificationToStream(message);
                    this.raiseNotification(message.event);
                });
            });
        }
        raiseNotification(notificationData) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!this.gnsConfig.showToasts) {
                    return;
                }
                const hasPermission = Notification.permission === "granted";
                if (!hasPermission && !this.gnsConfig.autoRequestPermission) {
                    return;
                }
                const config = {
                    title: notificationData.title,
                    body: yield this.getNotificationBody(notificationData),
                    focusPlatformOnDefaultClick: false,
                    data: { gns: notificationData },
                    actions: this.gnsConfig.showToastActions ? this.extractActions(notificationData) : undefined
                };
                if (this.gnsConfig.focusPlatformOnDefaultClick && this.gnsConfig.focusPlatformOnDefaultClick(notificationData)) {
                    config.focusPlatformOnDefaultClick = true;
                }
                console.log("raising with config");
                console.log(config);
                this.glue.notifications.raise(config).catch((err) => console.error(err));
            });
        }
        pushNotificationToStream(notificationData) {
            this.notificationsStream.push(notificationData);
        }
        extractActions(notificationData) {
            const actions = [];
            if (notificationData.canBeSnoozed) {
                actions.push({
                    action: "snooze",
                    title: "Snooze",
                    interop: {
                        method: gnsActionCommand,
                        arguments: { type: gnsActionCommandTypes.snooze, event: notificationData }
                    }
                });
            }
            return actions;
        }
        getNotificationBody(notificationData) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!this.gnsConfig.formatNotificationBody) {
                    return notificationData.description;
                }
                try {
                    const formattedBody = yield this.gnsConfig.formatNotificationBody(notificationData);
                    if (typeof formattedBody !== "string") {
                        throw new Error(`The provided body formatter did not return a string: ${typeof formattedBody}`);
                    }
                    return formattedBody;
                }
                catch (error) {
                    console.error(error);
                    return notificationData.description;
                }
            });
        }
        onNotificationsSubRequested(subscriber) {
            const subsArgs = subscriber.arguments;
            if (!subsArgs) {
                return subscriber.accept();
            }
            if (!subsArgs.snapshot) {
                return subscriber.accept();
            }
            const incomingValidation = snapshotRequestConfigDecoder.run(subsArgs.snapshot);
            if (incomingValidation && !incomingValidation.ok) {
                subscriber.reject(`GNS SNAPSHOT request rejected, because the provided payload did not pass the validation: ${JSON.stringify(incomingValidation.error)}`);
                return;
            }
            subscriber.accept();
        }
        onNotificationsSubAdded(subscriber) {
            const subsArgs = subscriber.arguments;
            if (!subsArgs) {
                return;
            }
            if (!subsArgs.snapshot) {
                return;
            }
            this.providersController.requestSnapshotsStreaming(subsArgs.snapshot, (batch) => {
                subscriber.push(batch);
                const isDedicatedGetStream = subscriber.stream.name === gnsGetNotificationsStreamName;
                if (batch.type === providerMessageTypes.snapshotEnd && isDedicatedGetStream) {
                    subscriber.close();
                }
            });
        }
        handleNotificationSnooze(config, commandId) {
            return this.providersController.snoozeNotification(config, commandId);
        }
        handleControlMessage(args, _, success, error) {
            var _a;
            const decodeResult = controlTypesDecoder.run(args.type);
            if (!decodeResult.ok) {
                const errString = JSON.stringify(decodeResult.error);
                return error(`Cannot execute this GNS control, because of type validation error: ${errString}`);
            }
            const commandType = decodeResult.result;
            args.commandId = shortid.generate();
            const controlPayload = args.payload;
            const incomingValidation = (_a = this.handlers[commandType].payloadDecoder) === null || _a === void 0 ? void 0 : _a.run(controlPayload);
            if (incomingValidation && !incomingValidation.ok) {
                throw new Error(`GNS control request ${commandType} rejected, because the provided payload did not pass the validation: ${JSON.stringify(incomingValidation.error)}`);
            }
            this.handlers[commandType].execute(controlPayload, args.commandId)
                .then((result) => {
                success(result);
            })
                .catch((err) => {
                const stringError = typeof err === "string" ? err : JSON.stringify(err.message);
                error(`GNS web rejected ${args.type} with reason: ${stringError}`);
            });
        }
    }

    function createRegistry(options) {
        if (options && options.errorHandling
            && typeof options.errorHandling !== "function"
            && options.errorHandling !== "log"
            && options.errorHandling !== "silent"
            && options.errorHandling !== "throw") {
            throw new Error("Invalid options passed to createRegistry. Prop errorHandling should be [\"log\" | \"silent\" | \"throw\" | (err) => void], but " + typeof options.errorHandling + " was passed");
        }
        var _userErrorHandler = options && typeof options.errorHandling === "function" && options.errorHandling;
        var callbacks = {};
        function add(key, callback, replayArgumentsArr) {
            var callbacksForKey = callbacks[key];
            if (!callbacksForKey) {
                callbacksForKey = [];
                callbacks[key] = callbacksForKey;
            }
            callbacksForKey.push(callback);
            if (replayArgumentsArr) {
                setTimeout(function () {
                    replayArgumentsArr.forEach(function (replayArgument) {
                        var _a;
                        if ((_a = callbacks[key]) === null || _a === void 0 ? void 0 : _a.includes(callback)) {
                            try {
                                if (Array.isArray(replayArgument)) {
                                    callback.apply(undefined, replayArgument);
                                }
                                else {
                                    callback.apply(undefined, [replayArgument]);
                                }
                            }
                            catch (err) {
                                _handleError(err, key);
                            }
                        }
                    });
                }, 0);
            }
            return function () {
                var allForKey = callbacks[key];
                if (!allForKey) {
                    return;
                }
                allForKey = allForKey.reduce(function (acc, element, index) {
                    if (!(element === callback && acc.length === index)) {
                        acc.push(element);
                    }
                    return acc;
                }, []);
                if (allForKey.length === 0) {
                    delete callbacks[key];
                }
                else {
                    callbacks[key] = allForKey;
                }
            };
        }
        function execute(key) {
            var argumentsArr = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                argumentsArr[_i - 1] = arguments[_i];
            }
            var callbacksForKey = callbacks[key];
            if (!callbacksForKey || callbacksForKey.length === 0) {
                return [];
            }
            var results = [];
            callbacksForKey.forEach(function (callback) {
                try {
                    var result = callback.apply(undefined, argumentsArr);
                    results.push(result);
                }
                catch (err) {
                    results.push(undefined);
                    _handleError(err, key);
                }
            });
            return results;
        }
        function _handleError(exceptionArtifact, key) {
            var errParam = exceptionArtifact instanceof Error ? exceptionArtifact : new Error(exceptionArtifact);
            if (_userErrorHandler) {
                _userErrorHandler(errParam);
                return;
            }
            var msg = "[ERROR] callback-registry: User callback for key \"" + key + "\" failed: " + errParam.stack;
            if (options) {
                switch (options.errorHandling) {
                    case "log":
                        return console.error(msg);
                    case "silent":
                        return;
                    case "throw":
                        throw new Error(msg);
                }
            }
            console.error(msg);
        }
        function clear() {
            callbacks = {};
        }
        function clearKey(key) {
            var callbacksForKey = callbacks[key];
            if (!callbacksForKey) {
                return;
            }
            delete callbacks[key];
        }
        return {
            add: add,
            execute: execute,
            clear: clear,
            clearKey: clearKey
        };
    }
    createRegistry.default = createRegistry;
    var lib = createRegistry;

    class ProvidersController {
        constructor(sequelizer, ioc) {
            this.sequelizer = sequelizer;
            this.ioc = ioc;
            this.registry = lib();
            this.providers = [];
        }
        start(config) {
            return __awaiter(this, void 0, void 0, function* () {
                this.providers = config.providers.map((providerConfig) => this.ioc.buildProvider(providerConfig));
                yield Promise.all(this.providers.map((provider) => provider.start()));
            });
        }
        onNotification(callback) {
            return this.registry.add("notification-message", callback);
        }
        onNotificationCancellation(callback) {
            return this.registry.add("notification-cancel", callback);
        }
        requestSnapshotsStreaming(snapConfig, callback) {
            this.sequelizer.enqueue(() => {
                return new Promise((resolve) => {
                    callback({ type: "snapshot-start" });
                    const unsub = this.registry.add("notification-snapshot", (batch) => {
                        if (batch.type === "snapshot-end" || batch.type === "snapshot-error") {
                            unsub();
                            resolve();
                        }
                        callback(batch);
                    });
                    const transactionConfig = Object.assign({}, snapConfig, { id: shortid.generate() });
                    this.providers[0].requestSnapshotsStreaming(transactionConfig);
                });
            });
        }
        snoozeNotification(snoozeConfig, commandId) {
            return __awaiter(this, void 0, void 0, function* () {
                const snoozeTransactionConfig = {
                    id: commandId,
                    eventId: snoozeConfig.id,
                    until: snoozeConfig.until,
                    snoozeReason: snoozeConfig.snoozeReason
                };
                return this.providers[0].requestNotificationSnooze(snoozeTransactionConfig);
            });
        }
        registerNotification(message) {
            this.registry.execute("notification-message", message);
        }
        registerNotificationSnapshot(message) {
            this.registry.execute("notification-snapshot", message);
        }
        registerNotificationCancellation(message) {
            this.registry.execute("notification-cancel", message);
        }
    }

    const routes = {
        snapshot: "/iris/snapshot",
        notifications: "/notifications-user",
        snooze: "/iris/snooze"
    };

    const PromisePlus = (executor, timeoutMilliseconds, timeoutMessage) => {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                const message = timeoutMessage || `Promise timeout hit: ${timeoutMilliseconds}`;
                reject(message);
            }, timeoutMilliseconds);
            const providedPromise = new Promise(executor);
            providedPromise
                .then((result) => {
                clearTimeout(timeout);
                resolve(result);
            })
                .catch((error) => {
                clearTimeout(timeout);
                reject(error);
            });
        });
    };

    class StompProvider {
        constructor(stompConfig, providersController, ioc) {
            this.stompConfig = stompConfig;
            this.providersController = providersController;
            this.ioc = ioc;
            this.registry = lib();
            this.locks = {};
            this.stompStreamMessages = {
                snoozed: { handle: this.handleSnoozedNotification.bind(this) },
                error: { handle: this.handleStompErrorMessage.bind(this) },
                cancel: { handle: this.handleCancelledNotification.bind(this) },
                new: { handle: this.handleNewNotification.bind(this) },
                ["snapshot-batch"]: { handle: this.handleSnapshotMessage.bind(this) },
                ["snapshot-end"]: { handle: this.handleSnapshotMessage.bind(this) }
            };
            this.fakeNotificationsStore = this.stompConfig.fakeStore || defaultFakeNotificationsStore;
        }
        start() {
            return __awaiter(this, void 0, void 0, function* () {
                this.configure();
                this.connect();
                yield this.waitConnection();
            });
        }
        requestSnapshotsStreaming(snapConfig) {
            this.locks[snapConfig.id] = { request: "snapshot" };
            if (this.stompConfig.useFakeStore || this.stompConfig.fakeStore) {
                setTimeout(() => {
                    this.fakeNotificationsStore.forEach((notification) => this.handleStompMessage({ body: JSON.stringify({ type: "snapshot-batch", event: notification, id: snapConfig.id }) }));
                    this.handleStompMessage({ body: JSON.stringify({ type: "snapshot-end", id: snapConfig.id }) });
                }, 1000);
                return;
            }
            if (!this.client.connected) {
                this.waitConnection()
                    .then(() => this.sendMessage(routes.snapshot, snapConfig))
                    .catch((err) => {
                    delete this.locks[snapConfig.id];
                    this.providersController.registerNotificationSnapshot({ type: "snapshot-error", message: err });
                });
            }
            else {
                this.sendMessage(routes.snapshot, snapConfig);
            }
        }
        requestNotificationSnooze(config) {
            const snoozeTransactionLock = new Promise((resolve, reject) => {
                this.locks[config.id] = { lift: resolve, fail: reject, request: "snooze" };
            });
            if (!this.client.connected) {
                this.waitConnection()
                    .then(() => this.sendMessage(routes.snooze, config))
                    .catch((err) => {
                    const lock = this.locks[config.id];
                    if (lock && lock.fail) {
                        lock.fail(err);
                        delete this.locks[config.id];
                    }
                });
            }
            else {
                this.sendMessage(routes.snooze, config);
            }
            return snoozeTransactionLock;
        }
        configure() {
            this.client = this.ioc.buildStompClient(this.stompConfig);
        }
        connect() {
            this.client.beforeConnect = () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const authorizationHeaders = this.stompConfig.recipient || (yield this.stompConfig.authorization());
                    this.client.connectHeaders = { "X-Authorization": authorizationHeaders };
                }
                catch (error) {
                    console.warn(`---- STOMP Before Connect Error -----`);
                    console.warn(error);
                }
            });
            this.client.onConnect = (receipt) => {
                if (!receipt.headers["session-id"]) {
                    this.registry.execute("connection-error", "No valid session id was provided.");
                    return;
                }
                this.sessionId = receipt.headers["session-id"];
                this.stompSubscription = this.client.subscribe(`${routes.notifications}${this.sessionId}`, this.handleStompMessage.bind(this));
                this.registry.execute("connected", receipt);
            };
            this.client.onStompError = (receipt) => {
                console.warn(`---- STOMP Error -----`);
                console.warn(receipt);
            };
            this.client.activate();
        }
        waitConnection() {
            return PromisePlus((resolve, reject) => {
                const unsubFuncs = [];
                const unsubConnect = this.registry.add("connected", () => {
                    unsubFuncs.forEach((unsub) => unsub());
                    resolve();
                });
                unsubFuncs.push(unsubConnect);
                const unsubError = this.registry.add("connection-error", (errorMessage) => {
                    unsubFuncs.forEach((unsub) => unsub());
                    reject(errorMessage);
                });
                unsubFuncs.push(unsubError);
            }, this.stompConfig.connectionTimeoutMS || stompProviderConnectionTimeoutMS, `Connection to the Stomp provider at ${this.stompConfig.url} timed out`);
        }
        handleStompMessage(message) {
            console.debug(`----- STOMP INCOMING MESSAGE FROM ${routes.notifications}${this.sessionId} ------`);
            console.debug(message);
            const body = JSON.parse(message.body);
            const validatedMessage = body;
            if (validatedMessage.event) {
                this.transformExecutionToGlueActions(validatedMessage.event);
            }
            const messageType = validatedMessage.type;
            this.stompStreamMessages[messageType].handle(validatedMessage);
        }
        handleStompErrorMessage(message) {
            const lock = this.locks[message.id];
            if (lock && lock.fail) {
                lock.fail({ message: message.message });
            }
            if (lock && lock.request === "snapshot") {
                delete this.locks[message.id];
                return this.providersController.registerNotificationSnapshot({
                    type: "snapshot-error",
                    message: message.message
                });
            }
            delete this.locks[message.id];
        }
        handleSnoozedNotification(message) {
            const lock = this.locks[message.id];
            if (lock && lock.request === "snooze" && lock.lift) {
                lock.lift({ snoozed: message.count });
                delete this.locks[message.id];
            }
        }
        handleNewNotification(message) {
            return this.providersController.registerNotification(message);
        }
        handleCancelledNotification(message) {
            return this.providersController.registerNotificationCancellation(message);
        }
        handleSnapshotMessage(message) {
            if (message.type === "snapshot-end") {
                delete this.locks[message.id];
            }
            return this.providersController.registerNotificationSnapshot(message);
        }
        transformExecutionToGlueActions(event) {
            if (!Array.isArray(event.actions) || !event.actions.length) {
                return;
            }
            const glueActions = event.actions.map((action) => {
                return {
                    action: action.type,
                    title: action.caption,
                    interop: {
                        method: gnsActionCommand,
                        arguments: action.execution
                    }
                };
            });
            event.actions = glueActions;
        }
        sendMessage(destination, body) {
            console.debug(`----- STOMP OUTGOING MESSAGE TO ${destination} ------`);
            console.debug(body);
            this.client.publish({ destination, body: JSON.stringify(body) });
        }
    }

    class AsyncSequelizer {
        constructor(minSequenceInterval = 0) {
            this.minSequenceInterval = minSequenceInterval;
            this.queue = [];
            this.isExecutingQueue = false;
            this.stopped = false;
        }
        enqueue(action) {
            return new Promise((resolve, reject) => {
                if (this.stopped) {
                    return;
                }
                this.queue.push({ action, resolve, reject });
                this.executeQueue();
            });
        }
        stop() {
            return __awaiter(this, void 0, void 0, function* () {
                this.stopped = true;
                yield Promise.all(this.queue);
            });
        }
        executeQueue() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.isExecutingQueue) {
                    return;
                }
                this.isExecutingQueue = true;
                while (this.queue.length) {
                    const operation = this.queue.shift();
                    if (!operation) {
                        this.isExecutingQueue = false;
                        return;
                    }
                    try {
                        const actionResult = yield operation.action();
                        operation.resolve(actionResult);
                    }
                    catch (error) {
                        operation.reject(error);
                    }
                    yield this.intervalBreak();
                }
                this.isExecutingQueue = false;
            });
        }
        intervalBreak() {
            return new Promise((res) => setTimeout(res, this.minSequenceInterval));
        }
    }

    class IoC {
        constructor(config, glue) {
            this.config = config;
            this.glue = glue;
        }
        get sequelizer() {
            if (!this._sequelizer) {
                this._sequelizer = new AsyncSequelizer();
            }
            return this._sequelizer;
        }
        get providersController() {
            if (!this._providersController) {
                this._providersController = new ProvidersController(this.sequelizer, this);
            }
            return this._providersController;
        }
        get glueController() {
            if (!this._glueController) {
                this._glueController = new GlueController(this.glue, this.providersController);
            }
            return this._glueController;
        }
        buildProvider(stompConfig) {
            return new StompProvider(stompConfig, this.providersController, this);
        }
        buildStompClient(config) {
            const stompConfig = {
                webSocketFactory: () => new window.SockJS(config.url)
            };
            return new StompJs.Client(stompConfig);
        }
    }

    const validateProvidersConfig = (config) => {
        if (config.type !== "stomp") {
            return;
        }
        if (!config.recipient && !config.authorization) {
            throw new Error(`The config for stomp provider with url: ${config.url} is not valid, because it is missing a recipient or an authorization function`);
        }
    };
    const start = (glue, config) => __awaiter(void 0, void 0, void 0, function* () {
        console.debug("------- Starting GNS Web ------");
        const validatedConfig = gnsWebConfigDecoder.runWithException(config);
        validatedConfig.providers.forEach((providerConfig) => validateProvidersConfig(providerConfig));
        const parsedConfig = cjs(defaultConfig, validatedConfig);
        const ioc = new IoC(parsedConfig, glue);
        yield ioc.glueController.start(parsedConfig);
        yield ioc.providersController.start(parsedConfig);
        console.debug("------- GNS Web Started ------");
    });

    if (typeof window !== "undefined") {
        window.GNSWeb = start;
    }

    return start;

})));
//# sourceMappingURL=gns.web.umd.js.map
