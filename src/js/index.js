(function() {
    var gridsterVue;
    var showKeys=["width","height","background"];
    /**
     * "animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-repeat","background-size","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-left-color","border-left-style","border-left-width","border-right-color","border-right-style","border-right-width","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","bottom","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","clear","clip","color","content","cursor","direction","display","empty-cells","float","font-family","font-kerning","font-size","font-stretch","font-style","font-variant","font-variant-ligatures","font-variant-caps","font-variant-numeric","font-weight","height","image-rendering","isolation","left","letter-spacing","line-height","list-style-image","list-style-position","list-style-type","margin-bottom","margin-left","margin-right","margin-top","max-height","max-width","min-height","min-width","mix-blend-mode","motion-offset","motion-path","motion-rotation","object-fit","object-position","opacity","orphans","outline-color","outline-offset","outline-style","outline-width","overflow-wrap","overflow-x","overflow-y","padding-bottom","padding-left","padding-right","padding-top","pointer-events","position","resize","right","speak","table-layout","tab-size","text-align","text-align-last","text-decoration","text-indent","text-rendering","text-shadow","text-overflow","text-transform","top","touch-action","transition-delay","transition-duration","transition-property","transition-timing-function","unicode-bidi","vertical-align","visibility","white-space","widows","width","will-change","word-break","word-spacing","word-wrap","z-index","zoom","-webkit-appearance","backface-visibility","-webkit-background-clip","-webkit-background-origin","-webkit-border-horizontal-spacing","-webkit-border-image","-webkit-border-vertical-spacing","-webkit-box-align","-webkit-box-decoration-break","-webkit-box-direction","-webkit-box-flex","-webkit-box-flex-group","-webkit-box-lines","-webkit-box-ordinal-group","-webkit-box-orient","-webkit-box-pack","-webkit-box-reflect","-webkit-clip-path","column-count","column-gap","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","-webkit-filter","align-content","align-items","align-self","flex-basis","flex-grow","flex-shrink","flex-direction","flex-wrap","justify-content","-webkit-font-smoothing","-webkit-highlight","-webkit-hyphenate-character","-webkit-line-break","-webkit-line-clamp","-webkit-locale","-webkit-margin-before-collapse","-webkit-margin-after-collapse","-webkit-mask-box-image","-webkit-mask-box-image-outset","-webkit-mask-box-image-repeat","-webkit-mask-box-image-slice","-webkit-mask-box-image-source","-webkit-mask-box-image-width","-webkit-mask-clip","-webkit-mask-composite","-webkit-mask-image","-webkit-mask-origin","-webkit-mask-position","-webkit-mask-repeat","-webkit-mask-size","order","perspective","perspective-origin","-webkit-print-color-adjust","-webkit-rtl-ordering","shape-outside","shape-image-threshold","shape-margin","-webkit-tap-highlight-color","-webkit-text-combine","-webkit-text-decorations-in-effect","-webkit-text-emphasis-color","-webkit-text-emphasis-position","-webkit-text-emphasis-style","-webkit-text-fill-color","-webkit-text-orientation","-webkit-text-security","-webkit-text-stroke-color","-webkit-text-stroke-width","transform","transform-origin","transform-style","-webkit-user-drag","-webkit-user-modify","-webkit-user-select","-webkit-writing-mode","-webkit-app-region","buffered-rendering","clip-path","clip-rule","mask","filter","flood-color","flood-opacity","lighting-color","stop-color","stop-opacity","color-interpolation","color-interpolation-filters","color-rendering","fill","fill-opacity","fill-rule","marker-end","marker-mid","marker-start","mask-type","shape-rendering","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","alignment-baseline","baseline-shift","dominant-baseline","text-anchor","writing-mode","vector-effect","paint-order","d","cx","cy","x","y","r","rx","ry"
     */

    var baseModel = {
        nodeName: "",
        class: {
            choose: false
        },
        // 和`v-bind:class`一样的 API
        // 和`v-bind:style`一样的 API
        style: {

        },
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
                return $.extend(true, {}, baseModel, {
                        nodeName: "div",
                        class: {
                            view_div: true,
                        },
                        attrs: {

                        },
                        style: {
                            minHeight: "100px",
                            margin: "1em",
                            padding: "1em"
                        },
                        on: {
                            click: elementChooseEvent
                        }
                    }, modelDefine)
                    //内部布局块
            case "view_inlineDiv":
                return $.extend(true, {}, baseModel, {
                    nodeName: "div",
                    class: {
                        view_inlineDiv: true
                    },
                    attrs: {

                    },
                    style: {
                        display: "inline-block",
                        width: "100px",
                        height: "100px",
                        margin: "1em"
                    },
                    on: {
                        click: elementChooseEvent
                    }
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
        var item = getElement(e.target.dataset.index);
        Vue.set(item.class, "choose", true);
        vm.nowElement = item;
    }

    function autoFixScreen() {
        var screenHeight = window.innerHeight;

        $(".top").height(screenHeight * 0.8);
        $(".bottom").height(screenHeight * 0.2);
    }

    function initGridsterVue() {
        gridsterVue = new Vue({
            el: "#view",
            data: {
                items: [],
                nowElement: _.cloneDeep(baseModel)
            },
            methods: {
                styleChange:function(e,key){
                    console.dir(e);
                    console.dir(key);
                    console.dir(this.nowElementStyles);
                }
            },
            computed: {
                nowElementStyles: function() {
                    this.nowElement;
                    var child=this.$children[0];
                    if(!child) return {};
                    var index=this.nowElement.attrs["data-index"];
                    var nowElementNode=_.get(child.$refs,"el"+index);
                    
                    var styleObject=window.getComputedStyle(nowElementNode);
                    console.dir("\""+_.join(styleObject,"\",\"")+"\"");
                    styleObject=_.pick(styleObject,showKeys);
                    return styleObject;
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
                        }, createElement(c, this.items))
                    }
                }
            }
        });

        gridsterVue.$nextTick(function() {
            $("#gridster").sortable();


            var viewDiv = new Model("view_div");
            var inlineBlock1 = new Model("view_inlineDiv");
            var inlineBlock2 = new Model("view_inlineDiv");

            addChild(viewDiv, [inlineBlock1, inlineBlock2]);
            this.items.push(viewDiv);
            this.$nextTick(function() {
                $(".view_div").sortable();
            });
        });
    }

    /**
     * 创建元素
     */
    function createElement(c, eles, parent) {
        var array = [];
        for (var i = 0; i < eles.length; i++) {
            var item = eles[i];
            //为每个元素设置标识
            if (parent) {
                Vue.set(item.attrs, "data-index", parent.attrs["data-index"] + "-" + i);
                Vue.set(item,"ref","el"+parent.attrs["data-index"] + "-" + i);
            } else {
                Vue.set(item.attrs, "data-index", i);
                Vue.set(item,"ref","el"+ i);
            }

            var tempItem = _.cloneDeep(item);
            var child = tempItem.content;


            if (typeof child == "string") {
                array.push(c(tempItem.nodeName, tempItem, tempItem.content));
            } else if (child instanceof Array) {
                array.push(c(tempItem.nodeName, tempItem, createElement(c, item.content, item)));
            }
        }
        return array;
    }

    function getElement(index) {
        var indexArray = index.split("-");
        var items = gridsterVue.items;
        var nowObj = items[0];
        indexArray.forEach(function(i, j) {
            if (j == 0) return;
            nowObj = nowObj.content[i];
        });

        return nowObj;
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

    window.view = {
        init: init
    }

})();