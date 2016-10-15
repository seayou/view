(function() {
    //用于显示在最下方的属性分组
    var styleGroup = {
        size: {
            name: "尺寸",
            width: {
                value: "", //当前值
                placeholder: "", //提示
                type: "", //输入框类型
                selectValues: [] //可选值
            },
            height: {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            "min-width": {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            "max-width": {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            "min-height": {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            "max-height": {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
        },
        display: {
            name: "表现形式",
            display: {
                value: "",
                placeholder: "",
                type: "select",
                selectValues: ["inline", "table-row-group", "table-row", "table-header-group", "table-footer-group", "table-column-group", "table-column", "table-cell", "table-caption", "table", "run-in", "run-in", "none", "list-item", "inline-table", "inline-flex", "inline-block", "flex", "container", "compact", "block"]
            },
        },
        border: {
            name: "边框",
            border: {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            "border-width": {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            "border-style": {
                value: "",
                placeholder: "",
                type: "select",
                selectValues: ["none", "solid", "ridge", "outset", "inset", "hidden", "groove", "double", "dotted", "dashed"]
            },
            "border-left": {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            "border-top": {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            "border-bottom": {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            "border-right": {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            }
        },
        position: {
            name: "位置",
            position: {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            float: {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            left: {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            right: {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            top: {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            bottom: {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
        },
        background: {
            name: "背景",
            background: {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            "background-color": {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            opacity: {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            "box-shadow": {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            }
        },
        marginPadding: {
            name: "内外边距",
            margin: {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            padding: {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            }
        },
        content: {
            name: "内容控制",
            "font-style": {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            "font-variant": {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            "font-weight": {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            "font-size": {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            "line-height": {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            "font-family": {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            "verticle-align": {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            "text-align": {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            "text-overflow": {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
        },
        flex: {
            name: "flex布局",
            flex: {
                value: "",
                placeholder: "[flex-grow] [flex-shrink] [flex-basis]",
                type: "",
                selectValues: []
            },
            "flex-grow": {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            "flex-shrink": {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            "flex-basis": {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
            "align-self": {
                value: "",
                placeholder: "",
                type: "select",
                selectValues: ["auto","stretch","flex-start","flex-end","center","baseline"]
            },
            "flex-direction": {
                value: "",
                placeholder: "",
                type: "select",
                selectValues: ["row", "row-reverse", "column-reverse", "column"]
            },
            "flex-wrap": {
                value: "",
                placeholder: "",
                type: "select",
                selectValues: ["nowrap", "wrap-reverse", "wrap"]
            },
            "justify-content": {
                value: "",
                placeholder: "",
                type: "select",
                selectValues: ["flex-start","space-between","space-around","flex-end","center"]
            },
            "align-items": {
                value: "",
                placeholder: "",
                type: "select",
                selectValues: ["stretch","flex-start","flex-end","center","baseline"]
            },
            "align-content": {
                value: "",
                placeholder: "",
                type: "select",
                selectValues: ["stretch","space-between","space-around","flex-start","flex-end","center"]
            },
            "order": {
                value: "",
                placeholder: "",
                type: "",
                selectValues: []
            },
        }
    }

    window.commonStyle = styleGroup;
})();
