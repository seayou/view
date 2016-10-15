(function() {
    var gridsterVue;
    var showKeys = ["width", "height", "background", "border", "margin", "padding", "overflow", "opacity", "display", "position", "float", "left", "top", "bottom", "right", "verticle-align", "text-align", "box-shadow", "font-size"];

    var styleGroup = window.commonStyle;

    //将styleGroup总的属性带-分隔符的转换成不带的
    var baseStyle = (function() {
        var baseStyle = {};
        for (var key in styleGroup) {
            for (var subkey in styleGroup[key]) {
                if (subkey.indexOf("-") != -1) {
                    var keys = subkey.split("-");
                    subkey = keys[0] + _.upperFirst(keys[1]);
                }
                baseStyle[subkey] = "";
            }
        }

        return baseStyle;
    })();

    var baseModel = {
        nodeName: "",
        class: {
            choose: false
        },
        // 和`v-bind:class`一样的 API
        // 和`v-bind:style`一样的 API
        style: {},
        // 正常的 HTML 特性
        attrs: {
            // id: 'foo'
        },
        // 组件 props
        props: {
            // myProp: 'bar'
        },
        // DOM 属性
        domProps: {
            // innerHTML: 'baz'
        },
        // 事件监听器基于 "on"
        // 所以不再支持如 v-on:keyup.enter 修饰器
        // 需要手动匹配 keyCode。
        on: {
            // click: this.clickHandler
        },
        // 仅对于组件，用于监听原生事件，而不是组件使用 vm.$emit 触发的事件。
        nativeOn: {
            // click: this.nativeClickHandler
        },
        // 自定义指令. 注意事项：不能对绑定的旧值设值
        // Vue 会为您持续追踨
        directives: [{
            // name: 'my-custom-directive',
            // value: '2'
            // expression: '1 + 1',
            // arg: 'foo',
            // modifiers: {
            //     bar: true
            // }
        }],
        // 如果子组件有定义 slot 的名称
        // slot: 'name-of-slot'
        // 其他特殊顶层属性
        // key: 'myKey',
        ref: '',
        content: "",
    }

    /**
     * 模块构造器
     * @param {[type]} modelDefine [description]
     */
    function Model(modeName, modelDefine) {
        switch (modeName) {
            //外部布局块
            case "view_div":
                return _.merge(_.cloneDeep(baseModel), {
                        nodeName: "div",
                        class: {
                            view_div: true,
                        },
                        attrs: {

                        },
                        style: {

                        },
                        on: {}
                    }, modelDefine)
                    //内部布局块
            case "view_inlineDiv":
                return _.merge(_.cloneDeep(baseModel), {
                    nodeName: "div",
                    class: {
                        view_inlineDiv: true
                    },
                    attrs: {},
                    style: {

                    },
                    on: {}
                }, modelDefine)
        }
    }

    function init() {
        autoFixScreen();
        initGridsterVue();
    }

    function elementChooseEvent(e) {
        var vm = gridsterVue;
        if (!_.isEmpty(vm.nowElement)) {
            Vue.set(vm.nowElement.class, "choose", false);
        }
        var item = getItem(e.target.dataset.index);
        Vue.set(item.class, "choose", true);
        vm.nowElement = item;
    }

    function autoFixScreen() {
        var screenHeight = window.innerHeight;

        $(".top").height(screenHeight * 0.8);
        $(".bottom").height(screenHeight * 0.16);
    }

    function initGridsterVue() {
        gridsterVue = new Vue({
            el: "#view",
            data: {
                items: [],
                nowType: "全部",
                typeSearch: "",
                nowDeatil: "",
                nowElement: _.cloneDeep(baseModel)
            },
            methods: {
                /**
                 * 弹出窗口
                 * @param  {[type]} e [description]
                 * @return {[type]}   [description]
                 */
                popWindow: function(e) {
                    var target = $(e.target);
                    if ($(".bottom").attr("class").indexOf("flyWindow") != -1) {
                        $(".bottom").removeClass("flyWindow").draggable("destroy").resizable("destroy");
                        $(".bottom").css("width", "100%");
                        autoFixScreen();
                        target.html("浮动此窗口");
                    } else {
                        var screenHeight = window.innerHeight;
                        $(".top").height(screenHeight);
                        $(".bottom").addClass("flyWindow").draggable().resizable();
                        $(".bottom").css("width", "50%");
                        target.html("还原此窗口");
                    }
                },
                searchInputKeyPress: function(e) {
                    if (e.keyCode == 13) {
                        $(e.target).select();
                    }
                },
                changeType: function(typeName) {
                    this.nowType = typeName;
                },
                styleChange: function(e, key) {
                    var value = e.target.value;

                    this.nowElement.style[key] = value;
                    Vue.set(this.nowElement.style, key, value);
                    this.nowElement.style[key] = value;
                    this.$children[0].$forceUpdate();

                    $(e.target).select();
                }
            },
            computed: {
                nowElementStyles: function() {
                    this.nowElement;
                    var child = this.$children[0];
                    if (!child) return {};
                    var index = this.nowElement.attrs["data-index"];
                    var nowElementNode = getItemNode(index);

                    var styleObject = window.getComputedStyle(nowElementNode);
                    // console.dir("\"" + _.join(styleObject, "\",\"") + "\"");
                    styleObject = _.pick(styleObject, showKeys);


                    return groupStyles(styleGroup, styleObject);
                    // return styleGroup;
                }
            },
            components: {
                gridster: {
                    props: ["items"],
                    render: function(c) {
                        return c("div", {
                            attrs: {
                                id: "gridster"
                            }
                        }, createElement(c, _.cloneDeep(this.items)));
                    }
                }
            }
        });

        gridsterVue.$nextTick(function() {
            $("#gridster").sortable({

            }).disableSelection();

            var viewDiv = new Model("view_div");
            var inlineBlock1 = new Model("view_inlineDiv");
            inlineBlock1.content = "1";
            var inlineBlock2 = new Model("view_inlineDiv");
            inlineBlock2.content = "2";
            var inlineBlock3 = new Model("view_inlineDiv");
            inlineBlock3.content = "3";

            addItem(viewDiv).then(function() {
                addItem(viewDiv).then(function(parent) {
                    addItem(new Model("view_inlineDiv"), parent).then(function(parent) {
                        addItem(new Model("view_inlineDiv", {
                            style: {
                                width: "50px",
                                height: "50px"
                            }
                        }), parent);
                    });
                    addItem(new Model("view_inlineDiv"),parent);
                });
            });
        });
    }

    /**
     * 将元素添加到items中
     */
    function addItem(item, parent) {
        var defer = $.Deferred();

        item = _.cloneDeep(item);
        if (_.isEmpty(parent)) { //添加在第一级
            parent = gridsterVue.items;
            _.set(item, "attrs['data-index']", parent.length);
            _.set(item, "ref", "el" + parent.length);
            item.on.click = elementChooseEvent;
            gridsterVue.items.push(item);
        } else {
            if (!(parent.content instanceof Array)) {
                Vue.set(parent, "content", []);
            }
            item.on.click = elementChooseEvent;
            _.set(item, "attrs['data-index']", parent.attrs["data-index"] + "-" + parent.content.length);
            _.set(item, "ref", "el" + parent.attrs["data-index"] + "-" + parent.content.length);
            parent.content.push(item);
        }

        gridsterVue.$nextTick(function() {
            var itemNode = getItemNode(item.attrs["data-index"]);
            var firstClass=itemNode.className.split(" ")[0];

            $(itemNode).sortable({
                connectWith:"*"
            });
            defer.resolve(item);
        });

        return defer.promise();
    }

    function dealItems(eles, parent) {
        var index = parent.content.length;
        for (var i = 0; i < eles.length; i++) {
            var item = eles[i];

            item.on.click = elementChooseEvent;

            _.set(item, "attrs['data-index']", parent.attrs["data-index"] + "-" + index);
            _.set(item, "ref", "el" + parent.attrs["data-index"] + "-" + index++);

            if (typeof item.content == "string") {

            } else if (item.content instanceof Array) {
                dealItems(item.content, item);
            }
        }
    }

    /**
     * 创建元素
     */
    function createElement(c, eles, parent) {
        var array = [];
        for (var i = 0; i < eles.length; i++) {
            var item = eles[i];

            if (typeof item.content == "string") {
                array.push(c(item.nodeName, item, item.content));
            } else if (item.content instanceof Array) {
                array.push(c(item.nodeName, item, createElement(c, item.content, item)));
            }
        }
        return array;
    }

    /**
     * 从items里获取具体的item
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */
    function getItem(index) {
        var indexArray = index.split("-");
        var items = gridsterVue.items;

        if (indexArray.length == 1) {
            return items[indexArray[0]];
        }

        var nowObj = items[indexArray[0]];
        indexArray.forEach(function(i, j) {
            if (j == 0) return;
            nowObj = nowObj.content[i];
        });

        return nowObj;
    }

    /**
     * 获取当前元素对应的html元素
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */
    function getItemNode(index) {
        var child = gridsterVue.$children[0];
        if (!child) return {};
        var nowElementNode = _.get(child.$refs, "el" + index);
        return nowElementNode;
    }

    /**
     * 添加子元素元素
     * @param {[type]} parentItem [description]
     * @param {[type]} item       [description]
     */
    function addChild(parentItem, item) {
        if (parentItem.content instanceof Array) {

        } else if (typeof parentItem.content == "string") {
            Vue.set(parentItem, "content", []);
        } else {

        }

        if (item instanceof Array) {
            item.forEach(function(v) {
                parentItem.content.push(v);
            })
        } else if (typeof item == "object") {
            parentItem.content.push(item);

        }
    }

    function groupStyles(group, styles) {
        for (var key in group) {
            for (var subkey in group[key]) {
                if (subkey == "name") continue;
                group[key][subkey].default = styles[subkey];
            }
        }
        return group;
    }

    window.view = {
        init: init
    }

})();
