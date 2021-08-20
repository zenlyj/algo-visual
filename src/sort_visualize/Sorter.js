import React from 'react'
import SortChart from './components/SortChart'
import FunctionBar from './components/SortFunctionBar'
import {bubbleSort, mergeSort, quickSort, selectionSort, gravitySort} from './util/SortingAlgorithms'

class Sorter extends React.Component {
    constructor() {
        super()
        this.state = {
            isRunning:false,
            selectedAlgo:null,
            array:[],
            sorted:new Set(),
            arraySize:50,
            scanElement:null,
            pivot:null,
            delay:100,
            buffer:null
        }
        this.setAlgo = this.setAlgo.bind(this)
        this.generateRandomArray = this.generateRandomArray.bind(this)
        this.start = this.start.bind(this)
        this.pause = this.pause.bind(this)
        this.setDelay = this.setDelay.bind(this)
    }
    
    componentDidMount() {
        this.generateRandomArray()
    }

    setDelay(delay) {
        this.setState({delay:delay})
    }

    randInt = (low, high) => {
        const min = Math.ceil(low)
        const max = Math.floor(high)
        return Math.floor(Math.random() * (max-min+1)+min)
    }

    generateRandomArray() {
        if (this.state.isRunning) return
        let arr = []
        for (let i = 0; i < this.state.arraySize; i++) {
            arr.push(this.randInt(this.state.arraySize/4, this.state.arraySize))
        }
        this.setState({array:arr, buffer:null, sorted:new Set(), scanElement:null, pivot:null})
    }

    setAlgo(algo) {
        console.log(algo)
        if (this.state.isRunning) return
        this.setState({selectedAlgo:algo, buffer:null, sorted:new Set(), scanElement:null, pivot:null})
    }

    async cleanup() {
        const createPromise = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.setState({isRunning:false, array:this.state.array})
                    resolve();
                }, this.state.delay)
            })
        }
        await(createPromise(false))
    }

    async playbackSelection(createPromise) {
        const buffer = this.state.buffer
        const sortedSet = this.state.sorted
        while (this.state.isRunning) {
            if (buffer.isEmpty()) {
                this.cleanup()
                break
            }

            const scanElement = buffer.consumeScan()
            let diagram = this.state.array
            if (scanElement === null) {
                diagram = buffer.consumeDiagram()
                sortedSet.add(buffer.consumeSorted())
            }
            await(createPromise(this.state.delay, diagram, sortedSet, scanElement, null))
        }
    }

    async playbackBubble(createPromise) {
        const buffer = this.state.buffer
        const sortedSet = this.state.sorted
        while (this.state.isRunning) {
            if (buffer.isEmpty()) {
                this.cleanup()
                break
            }

            const scanElement = buffer.consumeScan()
            const diagramFrame = buffer.consumeDiagram()
            console.log(scanElement, diagramFrame)

            if ((scanElement === undefined || scanElement === null) && (diagramFrame === undefined || diagramFrame === null)) {
                sortedSet.add(buffer.consumeSorted())
                await(createPromise(this.state.delay, this.state.array, sortedSet, null, null))
                continue
            }
            if (scanElement === null) {
                sortedSet.add(buffer.consumeSorted())
            }
            await(createPromise(this.state.delay, diagramFrame, sortedSet, scanElement, null))
        }
    }

    async playbackMerge(createPromise) {
        const buffer = this.state.buffer
        const sortedSet = this.state.sorted
        while (this.state.isRunning) {
            if (buffer.isEmpty()) {
                this.cleanup()
                break
            }
            const scanElement = buffer.consumeScan()

            if (scanElement === undefined) {
                for (let j = 0; j < this.state.array.length; j++) sortedSet.add(buffer.consumeSorted())
                await(createPromise(this.state.delay, this.state.array, sortedSet, null, null))
            } else {
                const diagram = scanElement === null ? buffer.consumeDiagram() : this.state.array
                await(createPromise(this.state.delay, diagram, sortedSet, scanElement, null))
            }
        }
    }

    async playbackQuick(createPromise) {
        const buffer = this.state.buffer
        const sortedSet = this.state.sorted
        let pivot = this.state.pivot
        let toRefreshPivot = (this.state.pivot === null || !this.state.pivot.isBefore) ? true : false
        let isStart = true
        while (this.state.isRunning) {
            if (buffer.isEmpty()) {
                this.cleanup()
                break
            }
            if (toRefreshPivot) {
                pivot = buffer.consumePivots()  
                if (pivot === undefined) pivot = null
                const delay = isStart ? this.state.delay : this.state.delay*10
                isStart = false
                await(createPromise(delay, this.state.array, sortedSet, null, pivot))
                toRefreshPivot = false
                continue
            }

            const scanElement = buffer.consumeScan()
            if (scanElement === undefined) { 
                for (let i = 0; i < this.state.array.length; i++) sortedSet.add(buffer.consumeSorted())
                await(createPromise(this.state.delay, this.state.array, sortedSet, null, null))
            } else if (scanElement === null) {
                const pivotAfter = {before:pivot.before, after:pivot.after, isBefore:false}
                await(createPromise(this.state.delay, buffer.consumeDiagram(), sortedSet, null, pivotAfter))
                toRefreshPivot = true
            } else {
                await(createPromise(this.state.delay, this.state.array, sortedSet, scanElement, pivot))
            }
        }
    }

    async playbackGravity(createPromise) {
        const buffer = this.state.buffer
        const sortedSet = this.state.sorted
        while (this.state.isRunning) {
            if (buffer.isEmpty()) {
                this.cleanup()
                break
            }

            const diagram = buffer.consumeDiagram()
            if (diagram === undefined) {
                for (let i = 0; i < this.state.array.length; i++) sortedSet.add(buffer.consumeSorted())
                await(createPromise(this.state.delay, this.state.array, sortedSet, null, null))
            } else {
                await(createPromise(this.state.delay, diagram, sortedSet, null, null))
            }
        }
    }

    bufferAlgo() {
        let buffer = null
        switch(this.state.selectedAlgo) {
            case 'SELECTION':
                buffer = selectionSort(this.state.array)
                break
            case 'BUBBLE':
                buffer = bubbleSort(this.state.array)
                break
            case 'MERGE':
                buffer = mergeSort(this.state.array)
                break
            case 'QUICK':
                buffer = quickSort(this.state.array)
                break
            case 'GRAVITY':
                buffer = gravitySort(this.state.array)
                break
            default:
        }
        this.setState({buffer:buffer})
    }

    start() {
        const createPromise = (delay, array, sorted, scanElement, pivot) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.setState({array:array, sorted:sorted, scanElement:scanElement, pivot:pivot})
                    resolve();
                }, delay)
            })
        }
        if (this.state.buffer === null) {
            this.bufferAlgo()
        }
        this.setState({isRunning:true}, ()=> {
            switch(this.state.selectedAlgo) {
                case 'SELECTION':
                    this.playbackSelection(createPromise)
                    break
                case 'BUBBLE':
                    this.playbackBubble(createPromise)
                    break
                case 'MERGE':
                    this.playbackMerge(createPromise)
                    break
                case 'QUICK':
                    this.playbackQuick(createPromise)
                    break
                case 'GRAVITY':
                    this.playbackGravity(createPromise)
                    break
                default:
            }
        })
    }

    pause() {
        this.setState({isRunning:false})
    }

    render() {
        const pivotBefore = (this.state.pivot !== null && this.state.pivot.isBefore) ? this.state.pivot.before : null
        const pivotAfter = (this.state.pivot !== null && !this.state.pivot.isBefore) ? this.state.pivot.after : null
        return (
            <div>
                <FunctionBar isRunning={this.state.isRunning} selectedAlgo={this.state.selectedAlgo} setAlgo={this.setAlgo} delay={this.state.delay} setDelay={this.setDelay} generateRandomArray={this.generateRandomArray} start={this.start} pause={this.pause}/>
                <SortChart array={this.state.array} sorted={this.state.sorted} scanElement={this.state.scanElement} pivotBefore={pivotBefore} pivotAfter={pivotAfter}/>
            </div>
        )
    }
}

export default Sorter