import * as React from 'react';
import { ScrollingContainer } from './scrolling-container';

export interface AwooDisplayProps {
    /**
     * A number in the range [0, 1] indicating intensity.
     * 0 - less intense
     * 1 - more intense
     */
    intensity?: number;
}

export class AwooDisplay extends React.Component<AwooDisplayProps, {text: string}> {
    private timerID: number;
    private scrollingContainer: ScrollingContainer;

    constructor(props: any) {
        super(props);

        this.state = {
            text: 'awoo'
        }
    }

    private getIntensity() {
        return this.props.intensity === undefined ? 0 : this.props.intensity;
    }

    private getFontSize() {
        return `${this.getIntensity() * 10 + 5}vh`
    }

    private getNextSymbol(text: string) {
        let intensity = this.getIntensity();

        let markov: {[key: string]: [string, number][]} = {
            'a': [['w', 1]],
            'w': [['oo', .95], ['w', 0.5]],
            'o': [['o', 0.6 * intensity + 0.2], ['w', 0.05], ['.', 1 - intensity], ['\xa0', 1]],
            '.': [['.', 0.8 * (1 - intensity)], ['\xa0', 1]],
            '\xa0': [['a', 0.025 + intensity * .95 ], ['w', 0.05 + intensity * .5], ['\xa0', 1]]
        }

        let last = text[text.length - 1];

        let uppercase = false;
        if(intensity > 0.3) {
            if(last == 'a' || last == 'w' || last == 'o') {
                uppercase = Math.random() < intensity * 1.5 - 0.5
            } else {
                uppercase = Math.random() < intensity
            }
        }

        let x = Math.random(); 
        let q = 0;
        for(let item of markov[last.toLowerCase()]) {
            q += item[1];
            if(x <= q) {
                return uppercase ? item[0].toUpperCase() : item[0];
            }
        }
    }

    private tick() {
        this.setState((currentState) => {
            return { text: currentState.text + this.getNextSymbol(currentState.text) };
        });
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            100
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    componentDidUpdate(prevProps: AwooDisplayProps) {
        if(prevProps.intensity != this.props.intensity) this.scrollingContainer.snap();
    }

    render() {
        return (
            <div id="awoo-display" style={{backgroundColor: `rgba(145,124,118,${this.getIntensity()})`}}>
                <ScrollingContainer ref={(elm) => this.scrollingContainer = elm }>
                    <div className="soft-awoo" style={{fontSize: this.getFontSize()}}>{this.state.text}</div>
                </ScrollingContainer>
            </div>
        );
    } 
}