import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import {CdkDrag} from '@angular/cdk/drag-drop';

import * as htmlToImage from 'html-to-image';
import { ColorPickerModule } from 'ngx-color-picker';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CdkDrag, ColorPickerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent {

  

  font_color = ''
  font_size = 50
  name = 'Name Here'
  
  @ViewChild('image_file')
  image_file!: ElementRef

  @ViewChild('some_canvas')
  some_canvas!: ElementRef

  @ViewChild('imageFileInput')
  uploadedImage!: ElementRef
  

  imageGen(){

    
    const imagee = document.getElementById('image_generation')
    if(imagee != null){
      htmlToImage.toPng(imagee).then((someURL) => {
        var link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = someURL
        link.click();
      })
    }else{
      console.log('Image is null')
    }
    
    
    
    
  }

  changeFontSize(){

    const set_font_size = document.getElementById('id-font-size')
    if(set_font_size != null){
      this.font_size = parseInt((<HTMLInputElement>set_font_size).value)
    }
    
  }

  uploadImage(){

    const image = new Image()
    const ctx = this.some_canvas.nativeElement.getContext("2d");
    image.src = URL.createObjectURL(this.uploadedImage.nativeElement.files[0])
    
    image.addEventListener("load", (e) => {
      const imageAspectRatio = image.width/image.height
      if(imageAspectRatio >=1 ){
        ctx.drawImage(image, 0, 0, this.some_canvas.nativeElement.width, this.some_canvas.nativeElement.width/imageAspectRatio)
      }else{
        ctx.drawImage(image, 0, 0, this.some_canvas.nativeElement.height*imageAspectRatio, this.some_canvas.nativeElement.height)
      }
      
      console.log(image.width, image.height, imageAspectRatio)
    });

    

    

  }

  public handleImage(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = this.some_canvas.nativeElement;
        const ctx = canvas.getContext('2d');

        // Calculate scaling factor
        const scaleFactor = Math.min(canvas.width / img.width, canvas.height / img.height);

        // Calculate new image dimensions
        const scaledWidth = img.width * scaleFactor;
        const scaledHeight = img.height * scaleFactor;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw scaled image onto canvas
        ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

        ctx.font = '20px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('Hello, World!', 50, 100);

        const imageUrl = canvas.toDataURL('image/png');
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = imageUrl;
        link.click();
        //console.log('Generated invite image:', inviteImageUrl);
      };
    };

    reader.readAsDataURL(file);



  }

  public clearCanvas(): void {
    const canvas = this.some_canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.uploadedImage.nativeElement.value = '';
  }

  


} 



