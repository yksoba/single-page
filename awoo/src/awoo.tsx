import * as React from 'react';
import { AwooDisplay } from './awoo-display';
import { AwooMeter } from './awoo-meter';

export interface AwooState {
    /**
     * A number in the range [0, 1] indicating intensity.
     * 0 - less intense
     * 1 - more intense
     */
    intensity?: number;
}

export class Awoo extends React.Component<any, AwooState> {
    constructor(props: any) {
        super(props);

        this.state = {
            intensity: 0
        }

        this.onAwooMeterInput = this.onAwooMeterInput.bind(this);
    }

    private onAwooMeterInput(intensity: number) {
        this.setState(() => {
            return { intensity: intensity };
        })
    }

    render() {
        return [
            <AwooDisplay intensity={this.state.intensity} key="AwooDisplay" />,
            <AwooMeter onInput={this.onAwooMeterInput} key="AwooMeter" />
        ];
    }
}