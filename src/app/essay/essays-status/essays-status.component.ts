import { Component } from "@angular/core";

@Component({
    selector: 'app-essays-status',
    templateUrl: './essays-status.component.html',
    styleUrls: ['./essays-status.component.scss']
})
export class EssaysStatusComponent {
    userReviews = [
        {grade: 940, 
            essay: {
                title: "Título da Redação Título da Redação Título da Redação Título da Redação Título da Redação " 
            }},
        {grade: 800, 
            essay: {
                title: "Título da Redação Título da Redação Título da Redação Título da Redação Título da Redação " 
            }}
        ];    
}