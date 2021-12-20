import * as Turbo from "@hotwired/turbo";
import "./navbar";
import "./navprogress";
import "./video";
import "./subscribe";


Object.assign(Turbo.PageRenderer.prototype, {
  assignNewBody() {
    const container = document.querySelector("#app")
    const newContainer = this.newElement.querySelector("#app")

    if (container && newContainer) {
      container.replaceWith(newContainer)
    } else {
      document.body.replaceWith(this.newElement)
    }
  }
})

Turbo.setProgressBarDelay(200);
window.Turbo = Turbo;


document.addEventListener("turbo:load", function() {
console.info("turbo:load");
})

document.addEventListener("turbo:render", function() {
console.info("turbo:render");
})
