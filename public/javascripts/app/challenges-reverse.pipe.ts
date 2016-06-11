import {Pipe} from "@angular/core";

@Pipe({
    name: 'reverse'
})

export class ChallengesReversePipe {
    transform(value) {
        return value.slice().reverse();
    }
}