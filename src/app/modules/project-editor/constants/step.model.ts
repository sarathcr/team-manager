export class Step {
    readonly id?: StepId;
    readonly stepid?: statusId;
    status?: Status;
    name?: string;
}

export type statusId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9| 10
export type Status = 'INPROCESS' | 'DONE' | 'PENDING' 
export type StepId = 'stepOne' | 'stepTwo' | 'stepThree' | 'stepFour' | 'stepFive' | 'stepSix' | 'stepSeven' | 'stepEight' | 'stepNine' | 'stepTen' | 'stepEleven'

// export interface StepMenu {
//     id: number;
//     name: string;
//     status: Status
// }
