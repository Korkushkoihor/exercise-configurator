import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ExerciseConfigModel} from '../../models/exercise-config.model';
import set = Reflect.set;
import {toPng} from 'html-to-image';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent {
  @Input() config: ExerciseConfigModel;
  @Output() pressedBack: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('studentTable', {static: true}) studentTable: ElementRef;
  @ViewChild('teacherTable', {static: true}) teacherTable: ElementRef;

  public dataSource: any[] = [];
  public displayedColumns: string[] = [];
  private availableActions = ['+', '-'];
  private colors = [
    'rgba(233, 151, 121, 0.2)',
    'rgba(164, 42, 42, 0.2)',
    'rgba(255, 127, 1, 0.2)',
    'rgba(255, 1, 2, 0.2)',
    'rgba(254, 255, 0, 0.2)',
    'rgba(7, 255, 0, 0.2)',
    'rgba(37, 139, 33, 0.2)',
    'rgba(10, 254, 255, 0.2)',
    'rgba(79, 147, 205, 0.2)',
    'rgba(20, 2, 255, 0.2)',
    'rgba(148, 2, 211, 0.2)',
  ];

  constructor() {
  }

  public init(): void {
    const exercisesArray = [];
    for (let i = 0; i < this.config.exerciseCount; i++) {
      exercisesArray.push({
        values: [] as any[],
        finalValue: null
      });

      for (let j = 0; j < this.config.amountOfActions; j++) {
        let calculatedValue = null;
        let actionValue = null;
        let neededAction = null;
        if (j !== 0) {
          neededAction = this.availableActions[this.getRandomIntInInterval(0, 1)];

          if (neededAction === '+') {
            if (exercisesArray[i].values[j - 1].calculatedValue + 1 >= Math.pow(10, this.config.maxNumbers)) {
              neededAction = '-';
            }
          } else if (neededAction === '-') {
            if (exercisesArray[i].values[j - 1].calculatedValue - 1 <= 0) {
              neededAction = '+';
            }
          }

          calculatedValue = exercisesArray[i].values[j - 1].calculatedValue;
        }

        if (!calculatedValue) {
          if (this.allowLowerNumber(this.config.allowLowerRankNumbers)) {
            actionValue = this.generateNumber(this.getRandomIntInInterval(4 > this.config.maxNumbers ? 1 : this.config.maxNumbers - 3, this.config.maxNumbers));
          } else {
            actionValue = this.generateNumber(this.config.maxNumbers);
          }
        } else {
          if (neededAction === '+') {
            if (this.allowLowerNumber(this.config.allowLowerRankNumbers)) {
              actionValue = this.getRandomIntInInterval(1, Math.pow(10, this.config.maxNumbers) - 1 - calculatedValue);
            } else {
              if (Math.pow(10, this.config.maxNumbers) - 1 - calculatedValue < Math.pow(10, this.config.maxNumbers - 1)) {
                neededAction = '-';
                actionValue = this.getRandomIntInInterval(Math.pow(10, this.config.maxNumbers - 1), calculatedValue);
              } else {
                actionValue = this.getRandomIntInInterval(Math.pow(10, this.config.maxNumbers - 1),
                  Math.pow(10, this.config.maxNumbers) - 1 - calculatedValue);
              }
            }
          } else if (neededAction === '-') {
            if (this.allowLowerNumber(this.config.allowLowerRankNumbers)) {
              actionValue = this.getRandomIntInInterval(1, calculatedValue);
            } else {
              if (calculatedValue < Math.pow(10, this.config.maxNumbers - 1)) {
                neededAction = '+';
                actionValue = this.getRandomIntInInterval(Math.pow(10, this.config.maxNumbers - 1),
                  Math.pow(10, this.config.maxNumbers) - 1 - calculatedValue);
              } else {
                actionValue = this.getRandomIntInInterval(Math.pow(10, this.config.maxNumbers - 1), calculatedValue);
              }
            }
          } else {
            actionValue = this.getRandomIntInInterval(1, calculatedValue);
          }
        }

        exercisesArray[i].values.push({
          actionValue,
          calculatedValue: j === 0 ? actionValue : (neededAction === '+' ? calculatedValue + actionValue : calculatedValue - actionValue),
          neededAction
        });
      }
    }

    this.dataSource = new Array(this.config.amountOfActions);

    for (let i = 0; i <= this.config.amountOfActions; i++) {
      this.dataSource[i] = {};
      if (i !== this.config.amountOfActions) {
        for (let j = 0; j < this.config.exerciseCount; j++) {
          this.dataSource[i]['excs ' + (j + 1)] = exercisesArray[j].values[i];
        }
      } else {
        for (let j = 0; j < this.config.exerciseCount; j++) {
          this.dataSource[i]['excs ' + (j + 1)] = {};
        }
      }
    }

    const colorsTempArray = new Array(this.config.exerciseCount - 1);
    colorsTempArray[0] = this.colors[this.getRandomIntInInterval(0, this.colors.length - 1)];
    for (let j = 1; j < this.config.exerciseCount; j++) {
      colorsTempArray[j] = this.colors[this.getRandomIntInInterval(0, this.colors.length - 1)];
      while (colorsTempArray[j - 1] === colorsTempArray[j]) {
        colorsTempArray[j] = this.colors[this.getRandomIntInInterval(0, this.colors.length - 1)];
      }
    }

    for (let i = 0; i < this.dataSource.length; i++) {
      for (let j = 0; j < this.config.exerciseCount; j++) {
        this.dataSource[i]['excs ' + (1 + j)].color = colorsTempArray[j];
      }
    }

    this.displayedColumns = [];
    for (let j = 0; j < this.config.exerciseCount; j++) {
      this.displayedColumns.push('excs ' + (j + 1));
    }
  }

  public backButton(): void {
    this.pressedBack.emit(true);
  }

  public printTable(isTeacherTable: boolean): void {
    const newWin = window.open('');
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.innerHTML = `setTimeout(()=>{debugger; print(); close(); },3000)`;
    if (isTeacherTable) {
      (newWin as any).document.write(this.teacherTable.nativeElement.outerHTML);
      (newWin as any).document.appendChild(s);
    } else {
      (newWin as any).document.write(this.studentTable.nativeElement.outerHTML);
      (newWin as any).document.appendChild(s);
    }
  }

  downloadImage(isTeacherTable: boolean): void {
    if (isTeacherTable) {
      toPng(this.teacherTable.nativeElement)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `таблиця_вчителя_${this.config.exerciseCount}x.jpeg`;
          link.href = dataUrl;
          link.click();
        });
    } else {
      toPng(this.studentTable.nativeElement)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `таблиця_учня${this.config.exerciseCount}x.jpeg`;
          link.href = dataUrl;
          link.click();
        });
    }
  }

  private allowLowerNumber(allowed: boolean): boolean {
    return allowed;
    // return !allowed ? false : this.getRandomIntInInterval(0, 1) === 0;
  }

  private generateNumber(digitCount: number, maxValue: number = Math.pow(10, digitCount.toString().length) - 1): number {
    let number = 0;
    while ((number !== 0 && number > maxValue) || number === 0) {
      number = this.getRandomIntInInterval(Math.pow(10, digitCount - 1), Math.pow(10, digitCount) - 1);
      break;
    }
    return number;
  }

  private getRandomIntInInterval(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
