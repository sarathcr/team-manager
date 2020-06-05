export class Step {
    id?: ProjectId
    readonly stepid: statusId;
    readonly sectionid?: StepId;
    state: Status;
    name?: string;
}
export class StepState {
    id?: ProjectId
    steps: Step[]
}

export type ProjectId = number
export type statusId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9| 10
export type Status = 'INPROCESS' | 'DONE' | 'PENDING' 
export type StepId = 'stepOne' | 'stepTwo' | 'stepThree' | 'stepFour' | 'stepFive' | 'stepSix' | 'stepSeven' | 'stepEight' | 'stepNine' | 'stepTen' | 'stepEleven'

