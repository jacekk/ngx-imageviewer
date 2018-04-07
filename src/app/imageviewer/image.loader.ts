import { ResourceLoader, Dimension, toSquareAngle, ResourceLoadState, ResourceState, ResourceType } from './imageviewer.model';
import { ImageViewerConfig } from './imageviewer.config';

const imageResourceState: ResourceState = {
  currentPage: 1,
  numOfPages: 1,
  type: ResourceType.Image,
};

export class ImageResourceLoader extends ResourceLoader {

  setUp() {
    this.loadResource();
  }

  loadResource() {
    this.loadState = ResourceLoadState.Loading;
    this._image = new Image();
    this._image.addEventListener('load', (evt) => {
      this.loadState = ResourceLoadState.Loaded;
      this.onResourceStateChange.emit(imageResourceState);
      this.resourceChange.next();
    }, false);
    this._image.addEventListener('error', (evt) => {
      this.loadState = ResourceLoadState.Failed;
      this.onLoadError.emit(evt);
      this.resourceChange.next();
    }, false);
    this._image.src = this.src;
  }
}
