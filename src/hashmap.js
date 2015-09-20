(function (global, entriesVariable, lengthVariable, hasOwnProperty) {

    /**
     * Creates a new HashMap.
     * All keys are calculated down to a numerical hash.
     * @constructor
     */
    function HashMap() {
        this[entriesVariable] = {};
        this[lengthVariable] = 0;
    }

    HashMap.prototype = {
        /**
         * Gets the value associated with a certain key
         * @param key the key to get the value for
         * @returns {*} the value stored, or undefined
         */
        get: function (key) {
            return this._find(key).v;
        },

        /**
         * Puts a value associated with a key
         * @param key the key to set the value for
         * @param value the value to set, omit to remove key
         * @returns {*} the previous value
         */
        put: function (key, value, result, obj) {
            result = this._find(key);
            obj = {key: key, value: value};

            if (result.b) {
                if (result.e) {
                    result.e.value = value;
                } else {
                    result.b.push(obj);
                    this[lengthVariable]++;
                }
            } else {
                this[entriesVariable][result.h] = [obj];
                this[lengthVariable]++;
            }

            return result.v;
        },

        /**
         * Removes an entry
         * @param key the key to remove the entry before
         * @returns {*} the removed value
         */
        remove: function (key, result) {
            result = this._find(key);

            if (result.e) {
                if (result.b[lengthVariable] > 1) {
                    result.b.splice(result.i, 1);
                } else {
                    delete this[entriesVariable][result.h];
                }
                this[lengthVariable]--;
            }

            return result.v;
        },

        toArray: function (arr, hash, bucket, i, entry, max) {
            arr = [];
            for (hash in this[entriesVariable]) {
                if (this[entriesVariable][hasOwnProperty](hash)) {
                    bucket = this[entriesVariable][hash];
                    for (i = 0, max = bucket[lengthVariable]; i < max; i++) {
                        if (entry = bucket[i]) {
                            arr.push(entry.value);
                        }
                    }
                }
            }
            return arr;
        },

        _find: function (key, result, length, entry) {
            result = {
                h : calculateHash(key)
            };

            if (result.b = this[entriesVariable][result.h]) {
                length = result.b[lengthVariable];
                while (length--) {
                    entry = result.b[length];
                    if (entry.key === key) {
                        result.i = length;
                        result.v = entry.value;
                        result.e = entry;
                        break;
                    }
                }
            }

            return result;
        }
    };

    function calculateHash(object, hash, type, forVariable, value) {
        if (!object) {
            return 0;
        }
        /*
         fun bit of byte saving logic going on here...
         firstly, we'll get the current value of object.toString.hash, and test that it exists. If it does, we have a hash
         If it doesn't, we'll set the value of hash to 0. Now this as a test, will tell us if we should skip over the
         remaining tests... we have a non 0, then set the value of type to 'X' as we don't test for X, and we'll simply
         return it. If we have a 0 value for hash, then we haven't found a hash, so let's get the first character from
         the typeof string.
          */
        type = (hash = object.toString.hash || 0) ? 'X' : (typeof object).charAt(hash);       // Re-use hash as it's 0. It GZips better :)
        if (type == 's') {
            for (forVariable = hash; forVariable < object[lengthVariable]; forVariable++) { // Re-use hash as it's 0. It GZips better :)
                hash = 31 * hash + (object.charCodeAt(forVariable) * 2); // the 2 makes it more unique
            }
        } else if (type == 'o') { // null is checked on first line of function... we're safe
            for (forVariable in object) {
                if (object[hasOwnProperty](forVariable)) {
                    value = object[forVariable];
                    hash = hash * calculateHash(forVariable) + calculateHash(value);
                }
            }
        }
        return object.toString.hash = type == 'n' ?
            object // since we use an object now which converts to strings, decimals are fine
            :
            type == 'b' ? // Boolean
                1231 + object ?
                    hash // True value - reuse the 0 value of hash. It Gzips better
                    :
                    6 // False value
                :
                hash; // Either previously calculated or default of 0
                // store our hash for future use in a place where it will never been seen
    }

    if (global.module) {
        module.exports = HashMap;
    } else {
        global.HashMap = HashMap;
    }
})(this, 'entries', 'length', 'hasOwnProperty');
