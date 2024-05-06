import { Component, ElementRef, NgModule, OnInit, Renderer2, ViewChild } from '@angular/core';
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





export class AppComponent{

  constructor(private renderer: Renderer2){}

  @ViewChild('image_file')
  image_file!: ElementRef

  @ViewChild('some_canvas')
  some_canvas!: ElementRef

  @ViewChild('imageFileInput')
  uploadedImage!: ElementRef

  @ViewChild('leftColumn')
  leftColumn!: ElementRef

  screenHeight: number | undefined
  

  resizeCanvas(){

    console.log(this.renderer.parentNode : innerHeight)

    
  }

  

  font_color = ''
  font_size = 50
  name = 'Name Here'
  
  
  

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

  

  public handleImage(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = this.some_canvas.nativeElement;
        const leftColumn = this.leftColumn.nativeElement
        canvas.height = screen.height
        canvas.width = leftColumn.offsetWidth
        const ctx = canvas.getContext('2d');

        

        
        const scaleFactor = Math.min(canvas.width / img.width, canvas.height / img.height);

        
        const scaledWidth = img.width * scaleFactor;
        const scaledHeight = img.height * scaleFactor;

        console.log("Screen Height: ", screen.height, "Canvas Height: ", canvas.height, "Canvas Width: ", canvas.width, "Left Column Width: ", leftColumn.offsetWidth, "Image Height: ", img.height, "Scaled Height: ", scaledHeight)  
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        
        ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

        ctx.font = '20px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('Hello, World!', 50, 100);


        
        //const imageUrl = canvas.toDataURL('image/png');
        //var link = document.createElement('a');
        //link.download = 'my-image-name.jpeg';
        //link.href = imageUrl;
        //link.click();
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



