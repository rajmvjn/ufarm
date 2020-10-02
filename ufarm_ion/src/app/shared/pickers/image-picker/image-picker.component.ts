import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Input,
  OnChanges,
} from "@angular/core";
import {
  Plugins,
  Capacitor,
  CameraSource,
  CameraResultType,
} from "@capacitor/core";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-image-picker",
  templateUrl: "./image-picker.component.html",
  styleUrls: ["./image-picker.component.scss"],
})
export class ImagePickerComponent implements OnInit, OnChanges {
  @ViewChild("filePicker", { static: false }) filePickerRef: ElementRef<
    HTMLInputElement
  >;
  @Output() imagePick = new EventEmitter<string | File>();
  @Input() showPreview: string;
  @Input() imageUrl;

  selectedImage: string;
  usePicker = false;

  constructor(private platform: Platform) {}

  ngOnInit() {
    if (
      (this.platform.is("mobile") && !this.platform.is("hybrid")) ||
      this.platform.is("desktop")
    ) {
      this.usePicker = true;
    }

    if (this.showPreview) {
      this.selectedImage = this.imageUrl + this.showPreview;
    }
  }

  ngOnChanges() {
    if (typeof this.showPreview === "string") {
      this.selectedImage = this.imageUrl + this.showPreview;
    }
  }

  onPickImage() {
    if (!Capacitor.isPluginAvailable("Camera")) {
      this.filePickerRef.nativeElement.click();
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 10,
      source: CameraSource.Prompt,
      correctOrientation: true,
      width: 300,
      resultType: CameraResultType.DataUrl,
    })
      .then((image) => {
        console.log(image);

        this.selectedImage = image.dataUrl;
        this.imagePick.emit(image.dataUrl);
      })
      .catch((error) => {
        if (this.usePicker) {
          this.filePickerRef.nativeElement.click();
        }
        return false;
      });
  }

  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile) {
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.selectedImage = dataUrl;
      this.imagePick.emit(pickedFile);
    };
    fr.readAsDataURL(pickedFile);
  }
}
