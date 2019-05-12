import * as React from 'react';

export class ScrollingContainer extends React.Component<any, {xoffset: number}> {
    private mounted: boolean;
    private container: HTMLDivElement;

    constructor(props: any) {
        super(props);

        this.state = {
            xoffset: 0
        }

        this.mounted = false;

        window.addEventListener('resize', () => this.snap());
    }

    private animate() {
        if(this.mounted) {
            this.setState((currentState) => {
                let width = this.container.clientWidth;
                let alpha = 0.1;
                let xoffset = currentState.xoffset * (1 - alpha) + alpha * width;
                requestAnimationFrame(() => this.animate());

                return {
                    xoffset: xoffset
                }
            });
        }
    }

    componentDidMount() {
        this.mounted = true;
        this.animate();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return (
            <div className="scrolling-container" ref={ (elm) => this.container = elm }
                style={{left: `calc(100vw - ${this.state.xoffset}px)`}}>
                {this.props.children}
            </div>
        );
    }

    /**
     * Instantly scrolls all the way to the right
     */
    snap() {
        this.setState(() => {
            return { xoffset: this.container.clientWidth }
        });
    }
}