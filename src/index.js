(function() {
  const imageUploader = {
    addHover: function() {
      this.dropZone.classList.add("dragOver");
    },
    removeHover: function() {
      this.dropZone.classList.remove("dragOver");
    },
    handleDrop: function(e) {
      e.preventDefault();
      e.stopPropagation();

      const files = e.dataTransfer.files;
      [].forEach.call(files, file => {
        if (file.type.match("image.*")) {
          this.generateThumbnail(file);
        }
      });

      this.removeHover();
    },
    cancelDefault: function(e) {
      e.preventDefault();
      return false;
    },
    generateThumbnail: function(file) {
      const image = new Image();
      const reader = new FileReader();
      reader.onload = function() {
        image.src = reader.result;
      };
      reader.readAsDataURL(file);
      this.imageContainer.appendChild(image);
    },
    init: function() {
      this.dropZone = document.querySelector("#dropZone");
      this.imageContainer = document.querySelector("#imagesContainer");
      this.sendButton = document.querySelector("#send");
      this.status = document.querySelector("#status");
      this.progressBar = document.querySelector("#progress");

      this.dropZone.ondragenter = this.addHover.bind(this);
      this.dropZone.ondragleave = this.removeHover.bind(this);
      this.dropZone.ondragover = this.cancelDefault;
      this.dropZone.ondrop = this.handleDrop.bind(this);
    }
  };
  imageUploader.init();
})();
