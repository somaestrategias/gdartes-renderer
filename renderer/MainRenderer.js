import { ImageRenderer } from "./ImageRenderer.js";
import { TextRenderer } from "./TextRenderer.js";

export class MainRenderer {
    constructor(frame) {
        this.frame = frame;
    }

    render(template, input, state) {
        this.frame.find('*').not('.selection').remove();

        this.frame.width(template.width);
        this.frame.height(template.height);

        let imageRenderer = new ImageRenderer();
        let textRenderer = new TextRenderer();

        template.components.forEach(component => {
            let value = this.getValueByType(component, state);
            if (component.type === 'image') {
                let img = imageRenderer.render(component, value);
                this.frame.append(img);
            } else if (component.type === 'text') {
                let text = textRenderer.render(component, value);
                this.frame.append(text);
            }
        });
    }

    getValueByType(component, state) {
        switch(component.input_type) {
            case "static":
                return component.value;
            case "dynamic":
                if(state[component.input]) {
                    return state[component.input].value;
                }
                return "";
            default:
                throw "InputType inválido";
        }
    }

}