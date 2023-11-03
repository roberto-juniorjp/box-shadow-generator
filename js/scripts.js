// Classes

class BoxShadowGenerator {
  constructor(
    horizontalControl,
    horizontalRef,
    verticalControl,
    verticalRef,
    blurControl,
    blurRef,
    spreadControl,
    spreadRef,
    colorControl,
    colorRef,
    opacityControl,
    opacityRef,
    insetControl,
    previewBox,
    rule,
    mozRule,
    webkitRule
  ) {
    this.horizontal = horizontalControl;
    this.horizontalRef = horizontalRef;
    this.vertical = verticalControl;
    this.verticalRef = verticalRef;
    this.blur = blurControl;
    this.blurRef = blurRef;
    this.spread = spreadControl;
    this.spreadRef = spreadRef;
    this.colorControl = colorControl;
    this.colorRef = colorRef;
    this.opacityControl = opacityControl;
    this.opacityRef = opacityRef;
    this.insetControl = insetControl.checked;
    this.previewBox = previewBox;
    this.rule = rule;
    this.mozRule = mozRule;
    this.webkitRule = webkitRule;
  }

  initialize() {
    this.horizontalRef.value = this.horizontal.value;
    this.verticalRef.value = this.vertical.value;
    this.blurRef.value = this.blur.value;
    this.spreadRef.value = this.spread.value;
    this.colorRef.value = this.colorControl.value;
    this.opacityRef.value = this.opacityControl.value;

    this.applyRule();
    this.showRule();
  }

  applyRule() {
    const rgbValue = this.hexToRGB(this.colorRef.value);
    const shadowRule = `${this.insetControl ? "inset" : ""} ${
      this.horizontalRef.value
    }px ${this.verticalRef.value}px ${this.blurRef.value}px ${
      this.spreadRef.value
    }px rgba(${rgbValue}, ${this.opacityRef.value})`;
    this.previewBox.style.boxShadow = shadowRule;
    this.currentRule = shadowRule;
  }

  showRule() {
    this.rule.innerText = this.currentRule;
    this.webkitRule.innerText = this.currentRule;
    this.mozRule.innerText = this.currentRule;
  }

  updateValue(type, value) {
    switch (type) {
      case "horizontal":
        this.horizontalRef.value = value;
        break;
      case "vertical":
        this.verticalRef.value = value;
        break;
      case "blur":
        this.blurRef.value = value;
        break;
      case "spread":
        this.spreadRef.value = value;
        break;
      case "color":
        this.colorRef.value = value;
        break;
      case "opacity":
        this.opacityRef.value = value;
        break;
      case "inset":
        this.insetControl = value;
        break;
    }
    this.applyRule();
    this.showRule();
  }

  hexToRGB(hex) {
    return `${("0x" + hex[1] + hex[2]) | 0}, ${("0x" + hex[3] + hex[4]) | 0}, ${
      ("0x" + hex[5] + hex[6]) | 0
    }`;
  }
}

// Selectors

const horizontalControl = document.querySelector("#horizontal");
const verticalControl = document.querySelector("#vertical");
const blurControl = document.querySelector("#blur");
const spreadControl = document.querySelector("#spread");
const colorControl = document.querySelector("#color");
const opacityControl = document.querySelector("#opacity");
const insetControl = document.querySelector("#inset");

const horizontalRef = document.querySelector("#horizontal-value");
const verticalRef = document.querySelector("#vertical-value");
const blurRef = document.querySelector("#blur-value");
const spreadRef = document.querySelector("#spread-value");
const colorRef = document.querySelector("#color-value");
const opacityRef = document.querySelector("#opacity-value");

const previewBox = document.querySelector("#box");

const rule = document.querySelector("#rule span");
const webkitRule = document.querySelector("#webkit-rule span");
const mozRule = document.querySelector("#moz-rule span");

const rulesArea = document.querySelector("#rules-area")
const copyInstruction = document.querySelector("#copy-instructions")

// Instance Object

const boxShadow = new BoxShadowGenerator(
  horizontalControl,
  horizontalRef,
  verticalControl,
  verticalRef,
  blurControl,
  blurRef,
  spreadControl,
  spreadRef,
  colorControl,
  colorRef,
  opacityControl,
  opacityRef,
  insetControl,
  previewBox,
  rule,
  mozRule,
  webkitRule
);

// Events

horizontalControl.addEventListener("input", (e) => {
  const value = e.target.value;
  boxShadow.updateValue("horizontal", value);
});

verticalControl.addEventListener("input", (e) => {
  const value = e.target.value;
  boxShadow.updateValue("vertical", value);
});

blurControl.addEventListener("input", (e) => {
  const value = e.target.value;
  boxShadow.updateValue("blur", value);
});

spreadControl.addEventListener("input", (e) => {
  const value = e.target.value;
  boxShadow.updateValue("spread", value);
});

colorControl.addEventListener("input", (e) => {
  const value = e.target.value;
  boxShadow.updateValue("color", value);
});

opacityControl.addEventListener("input", (e) => {
  const value = e.target.value;
  boxShadow.updateValue("opacity", value);
});

insetControl.addEventListener("input", (e) => {
  const value = e.target.checked;
  boxShadow.updateValue("inset", value);
});

// Copy Code Events

rulesArea.addEventListener("click", () => {
    const rules = rulesArea.innerText.replace(/^\s*\n/gm, "")
    navigator.clipboard.writeText(rules).then(() => {
        copyInstruction.innerText = "Regra copiada com sucesso!"
        setTimeout(() => {
            copyInstruction.innerText = "Clique no quadro acima para copiar as regras"
        }, 1500)
    })
})

// Initial Load

boxShadow.initialize();
