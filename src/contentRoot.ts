import { Literal, Program } from "acorn";
import * as walk from "acorn-walk";
import * as escodegen from "escodegen";

const updateGames = (root: Program) => {
    /* walk.simple(root, {
        ArrayExpression(node) {
            if (node.elements.length && node.elements.every(element => element?.type === "ObjectExpression" && element.properties.some(prop => prop.type === "Property" && prop.key.type === "Identifier" && prop.key.name === "isPublic"))) {
                for (const element of node.elements) {
                    if (element?.type === "ObjectExpression") {
                        for (const prop of element.properties) {
                            if (prop.type === "Property" && prop.key.type === "Identifier") {
                                if (prop.key.name === "name") {
                                    prop.value = {
                                        start: 0, end: 0,
                                        type: "Literal",
                                        value: "foo",
                                    };
                                }
                            }
                        }
                    }
                }

                const list: any[] = new Function(`return ${escodegen.generate(node)}`)();
                console.log(list);
            }
        },
    }); */
};

export const replaceConnectContent = (root: Program) => {
    updateGames(root);

    const forceAudience = /^\/audience/i.test(window.location.pathname);

    walk.simple(root, {
        Literal(node) {
            if (typeof node.value == "string") {
                switch (node.value) {
                    case "yn2iepd23vskpmkzgeg2lkfsct7gsc":
                        node.value = "rz0ifcpc6hxhv2v8kgw8pta4mw848b";
                        break;
                    case "http://localhost:9090/":
                        node.value = "http://localhost:5173/";
                        break;
                }

                if (forceAudience) {
                    if (node.value === "ACTION.PLAY") node.value = "SUBMIT.JOIN_AUDIENCE";
                }
            }
        },
        Property(node) {
            if (forceAudience &&
                node.key.type === "Identifier" &&
                node.key.name === "joinAs" &&
                node.value.type === "Literal" &&
                node.value.value === "player") {
                node.value.value = "audience";
            }
        },
        ObjectExpression(node) {
            if (forceAudience &&
                node.properties.some(prop => prop.type === "Property" && prop.key.type === "Identifier" && prop.key.name === "statusKey") &&
                !node.properties.some(prop => prop.type === "Property" && prop.key.type === "Identifier" && prop.key.name === "joinAs")) {
                node.properties.push({
                    start: 0, end: 0,
                    type: "Property",
                    key: { start: 0, end: 0, type: "Identifier", name: "joinAs" },
                    value: { start: 0, end: 0, type: "Literal", value: "audience" },
                    kind: "init",
                    method: false,
                    shorthand: false,
                    computed: false,
                });
            }
        },
        ReturnStatement(node) {
            if (forceAudience &&
                node.argument?.type === "ConditionalExpression" &&
                node.argument.test.type === "MemberExpression" &&
                node.argument.test.object.type === "ThisExpression" &&
                node.argument.test.property.type === "Identifier" &&
                node.argument.test.property.name === "isReconnectable") {
                node.argument = node.argument.alternate;
            }
        },
    });
};

export const replaceModeratorContent = (root: Program) => {
    updateGames(root);
};