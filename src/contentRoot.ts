export const replaceConnectContent = (content: string) => {
    content = content
        .replaceAll("yn2iepd23vskpmkzgeg2lkfsct7gsc", "rz0ifcpc6hxhv2v8kgw8pta4mw848b")
        .replaceAll("http://localhost:9090/", "http://localhost:5173/");

    if (window.location.pathname.toLowerCase().includes("/audience")) content = content
        .replace("return this.isReconnectable?", "return false?")
        .replaceAll(`"ACTION.PLAY"`, `"SUBMIT.JOIN_AUDIENCE"`)
        .replaceAll(`joinAs:"player"`, `joinAs:"audience"`)
        .replace(`"STATUS.ROOM_NOT_FOUND":""`, `"STATUS.ROOM_NOT_FOUND":"",joinAs:"audience"`);

    return content;
};

export const replaceModeratorContent = (content: string) => {
    if (window.location.pathname.toLowerCase().includes("/hj")) {
        /* const res = await getGamesList(content);
        if (res) {
            content = res.replace(res.list.map((game: any) => {
                if (!game.features) game.features = ["moderation"];
                else if (!game.features.includes("moderation")) game.features.push("moderation");
                return game;
            }));
        } */

        let squiggleIndent: number = 0,
            bracketIndent: number = 0,
            build: string = "",
            hasGamesList: boolean = false,
            gamesListIndent: number = -1,
            gamesListChar: number = -1,
            hasMounted: boolean = false,
            mountedAtIndent: number = -1,
            mountedAtChar: number = -1;

        for (let i = 0; i < content.length; i++) {
            const char = content.charAt(i);
            build += char;
            switch (char) {
                case "[":
                    bracketIndent++;
                    if (!hasGamesList) {
                        gamesListChar = i;
                        build = "[";
                    }
                    break;
                case "]":
                    bracketIndent--;
                    if (hasGamesList) {
                        if (bracketIndent < gamesListIndent) {
                            // console.log(build);
                            const replace = (newText: string) => {
                                content = content.slice(0, gamesListChar) + newText + content.slice(i + 1);
                                i += newText.length - build.length;
                            };
                            const list: any[] = new Function(`return ${build}`)();
                            replace(JSON.stringify(list.map((game: any) => {
                                if (!game.features) game.features = ["moderation"];
                                else if (!game.features.includes("moderation")) game.features.push("moderation");
                                return game;
                            })));
                            build = "";
                            hasGamesList = false;
                        }
                    } else {
                        build = "";
                    }
                    break;
                case "{":
                    squiggleIndent++;
                    if (build.endsWith("mounted(){")) {
                        hasMounted = true;
                        mountedAtIndent = squiggleIndent;
                        mountedAtChar = i;
                        build = "";
                    }
                    break;
                case "}":
                    squiggleIndent--;
                    if (hasMounted && squiggleIndent < mountedAtIndent) {
                        const replace = (newText: string) => {
                            content = content.slice(0, mountedAtChar + 1) + newText + content.slice(i + 1);
                            i += newText.length - build.length;
                        };
                        if (build.includes("this.$refs.stage") && build.includes("parseLines(this.item.value.lines)")) {
                            replace(`if(this.item.value.image){const image=new Image();image.src=this.item.value.image;this.$refs.stage.append(image);this.$refs.stage.classList.add("tv-image-stage")}else{${build}}`);
                        }
                        hasMounted = false;
                    }
                    break;
                default:
                    /* if (!hasGamesList && build.includes("isPublic:!")) {
                        hasGamesList = true;
                        gamesListIndent = bracketIndent;
                        console.log(build);
                    } */
                    // if (!hasGamesList) console.log(build);
                    if (!hasGamesList && build.includes("isPublic:!")) {
                        hasGamesList = true;
                        gamesListIndent = bracketIndent;
                    }
                // await new Promise(resolve => window.requestAnimationFrame(resolve));
            }
        }
    }

    return content;
};