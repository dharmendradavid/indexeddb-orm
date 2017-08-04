import { Model } from './model';
var Builder = (function () {
    function Builder(builder, indexBuilder, relations, tables) {
        if (builder === void 0) { builder = []; }
        if (indexBuilder === void 0) { indexBuilder = {}; }
        if (relations === void 0) { relations = []; }
        if (tables === void 0) { tables = []; }
        this.builder = builder;
        this.indexBuilder = indexBuilder;
        this.relations = relations;
        this.tables = tables;
    }
    /**
     * Sets the index builder value as an 'and' reference
     *
     * @param indexName string
     * @param value mixed
     * @returns {Builder}
     */
    Builder.prototype.whereIndex = function (indexName, value) {
        this.indexBuilder = {
            index: indexName,
            value: value,
            type: 'and'
        };
        return this;
    };
    /**
     * Sets the index builder value as an 'in' reference
     * @param indexName
     * @param value
     * @returns {Builder}
     */
    Builder.prototype.whereIndexIn = function (indexName, value) {
        this.indexBuilder = {
            index: indexName,
            value: value,
            type: 'in'
        };
        return this;
    };
    /**
     * Sets the index builder value with point inclusive and sets greater than check
     * @param indexName
     * @param value
     * @returns {Builder}
     */
    Builder.prototype.indexGte = function (indexName, value) {
        this.indexBuilder = {
            index: indexName,
            value: value,
            type: 'gte'
        };
        return this;
    };
    /**
     * Sets the index builder value with point not inclusive and sets greater than check
     * @param indexName
     * @param value
     * @returns {Builder}
     */
    Builder.prototype.indexGt = function (indexName, value) {
        this.indexBuilder = {
            index: indexName,
            value: value,
            type: 'gt'
        };
        return this;
    };
    /**
     * Sets the index builder value with point inclusive and sets less than check
     * @param indexName
     * @param value
     * @returns {Builder}
     */
    Builder.prototype.indexLte = function (indexName, value) {
        this.indexBuilder = {
            index: indexName,
            value: value,
            type: 'lte'
        };
        return this;
    };
    /**
     * Sets the index builder value with point not inclusive and sets less than check
     *
     * @param indexName
     * @param value
     * @returns {Builder}
     */
    Builder.prototype.indexLt = function (indexName, value) {
        this.indexBuilder = {
            index: indexName,
            value: value,
            type: 'lt'
        };
        return this;
    };
    /**
     * Sets the index builder value with points inclusive and sets range between them
     * @param indexName
     * @param lower
     * @param upper
     * @returns {Builder}
     */
    Builder.prototype.indexBetween = function (indexName, lower, upper) {
        this.indexBuilder = {
            index: indexName,
            value: [lower, upper],
            type: 'between'
        };
        return this;
    };
    Builder.prototype.whereIn = function (attributeName, value) {
        this.builder.push({
            attribute: attributeName,
            value: value,
            type: 'in'
        });
        return this;
    };
    Builder.prototype.where = function (attributeName, value) {
        this.builder.push({
            attribute: attributeName,
            value: value,
            type: 'and'
        });
        return this;
    };
    Builder.prototype.gte = function (attributeName, value) {
        this.builder.push({
            attribute: attributeName,
            value: value,
            type: 'gte'
        });
        return this;
    };
    Builder.prototype.gt = function (attributeName, value) {
        this.builder.push({
            attribute: attributeName,
            value: value,
            type: 'gt'
        });
        return this;
    };
    Builder.prototype.lte = function (attributeName, value) {
        this.builder.push({
            attribute: attributeName,
            value: value,
            type: 'lte'
        });
        return this;
    };
    Builder.prototype.lt = function (attributeName, value) {
        this.builder.push({
            attribute: attributeName,
            value: value,
            type: 'lt'
        });
        return this;
    };
    Builder.prototype.between = function (attributeName, upper, lower) {
        upper = parseFloat(upper);
        lower = parseFloat(lower);
        if (isNaN(upper) || isNaN(lower)) {
            throw "Between is only for numeric values";
        }
        this.builder.push({
            attribute: attributeName,
            value: [upper, lower],
            type: 'between'
        });
        return this;
    };
    Builder.prototype.relation = function (modelName, type, localKey, foreignKey, func, primary) {
        if (func === void 0) { func = null; }
        if (primary === void 0) { primary = null; }
        this.tables.push(modelName);
        this.relations.push({
            modelName: modelName,
            func: func,
            localKey: localKey,
            foreignKey: foreignKey,
            type: type,
            primary: primary
        });
        return this;
    };
    Object.defineProperty(Builder, "helpers", {
        get: function () {
            return {
                checkNestedAttribute: function (attributeString, value, condition) {
                    return condition == Model.helpers.getNestedAttribute(attributeString, value);
                },
                getNestedAttribute: function (attributeString, value) {
                    var attributes = attributeString.split('.');
                    var i;
                    var content = value;
                    for (i = 0; i < attributes.length; i++) {
                        if (content[attributes[i]] === undefined) {
                            return undefined;
                        }
                        content = content[attributes[i]];
                    }
                    return content;
                },
                replaceNestedValues: function (attributes, value) {
                    for (var attribute in attributes) {
                        value[attribute] = attributes[attribute];
                    }
                    return value;
                },
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Builder.prototype, "RELATIONS", {
        // noinspection JSMethodCanBeStatic
        get: function () {
            return Builder.RELATIONS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Builder, "RELATIONS", {
        get: function () {
            return {
                hasOne: 'hasOne',
                hasMany: 'hasMany'
            };
        },
        enumerable: true,
        configurable: true
    });
    return Builder;
}());
export { Builder };
