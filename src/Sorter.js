import React from 'react'
import SortChart from './SortChart'
import SortingMenuBar from './SortingMenuBar'
import {bubbleSort, mergeSort, quickSort, selectionSort, gravitySort} from './SortingAlgorithms'

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
            pivotBefore:null,
            pivotAfter:null,
            delay:100,
            buffer:null
        }
        this.setAlgo = this.setAlgo.bind(this)
        this.generateRandomArray = this.generateRandomArray.bind(this)
        this.start = this.start.bind(this)
        this.pause = this.pause.bind(this)
    }
    
    componentDidMount() {
        this.generateRandomArray()
    }

    randInt = (low, high) => {
        const min = Math.ceil(low)
        const max = Math.floor(high)
        return Math.floor(Math.random() * (max-min+1)+min)
      }

    generateRandomArray() {
        let arr = []
        for (let i = 0; i < this.state.arraySize; i++) {
            arr.push(this.randInt(this.state.arraySize/4, this.state.arraySize))
        }
        this.setState({array:arr, sorted:new Set()})
    }

    setAlgo(algo) {
        this.setState({selectedAlgo:algo})
    }

    async playbackSelection(createPromise) {
        const buffer = this.state.buffer
        const sortedSet = new Set()
        while (!buffer.isEmpty() && this.state.isRunning) {
            const scan = buffer.consumeScan()
            const diagram = buffer.consumeDiagram()
            for (let i = 0; i < scan.length; i++) {
                await(createPromise(this.state.delay, diagram, sortedSet, scan[i], null, null))
            }
            sortedSet.add(buffer.consumeSorted())
            await(createPromise(this.state.delay, diagram, sortedSet, null, null, null))
        }
    }

    async playbackBubble(createPromise) {
        const buffer = this.state.buffer
        const sortedSet = new Set()
        while (!buffer.isEmpty() && this.state.isRunning) {
            const scan = buffer.consumeScan()
            const diagram = buffer.consumeDiagram()
            if (scan === undefined && diagram === undefined) {
                sortedSet.add(buffer.consumeSorted())
                await(createPromise(this.state.delay, this.state.array, sortedSet, null, null, null))
                continue
            }
            for (let i = 0; i < scan.length; i++) {
                await(createPromise(this.state.delay, diagram[i], sortedSet, scan[i], null, null))
            }
            sortedSet.add(buffer.consumeSorted())
            await(createPromise(this.state.delay, diagram[scan.length-1], sortedSet, null, null, null))
        }
    }

    async playbackMerge(createPromise) {
        const buffer = this.state.buffer
        const sortedSet = new Set()
        let i = 0
        while (!buffer.isEmpty() && this.state.isRunning) {
            i++
            if (i >= this.state.array.length) {
                for (let j = 0; j < this.state.array.length; j++) sortedSet.add(buffer.consumeSorted())
                await(createPromise(this.state.delay, this.state.array, sortedSet, null, null, null))
            } else {
                const diagram = buffer.consumeDiagram()
                const scanThru = buffer.consumeScan()
                for (let j = 0; j < scanThru.length; j++) {
                    await(createPromise(this.state.delay, this.state.array, sortedSet, scanThru[j], null, null))
                }
                await(createPromise(this.state.delay, diagram, sortedSet, null, null, null))
            }
        }
    }

    async playbackQuick(createPromise) {
        const buffer = this.state.buffer
        const sortedSet = new Set()
        while (!buffer.isEmpty() && this.state.isRunning) {
            const diagram = buffer.consumeDiagram()
            const scanThru = buffer.consumeScan()
            const pivot = buffer.consumePivots()
            if (diagram === undefined) { 
                for (let i = 0; i < this.state.array.length; i++) sortedSet.add(buffer.consumeSorted())
                await(createPromise(this.state.delay, this.state.array, sortedSet, null, null, null))
            } else {
                for (let i = 0; i < scanThru.length; i++) await(createPromise(this.state.delay, this.state.array, sortedSet, scanThru[i], pivot.before, null))
                await(createPromise(this.state.delay, diagram, sortedSet, null, null, pivot.after))
                await(createPromise(this.state.delay*15, diagram, sortedSet, null, null, pivot.after))
            }
        }
    }

    async playbackGravity(createPromise) {
        const buffer = this.state.buffer
        const sortedSet = new Set()
        while (!buffer.isEmpty() && this.state.isRunning) {
            const diagram = buffer.consumeDiagram()
            if (diagram === undefined) {
                for (let i = 0; i < this.state.array.length; i++) sortedSet.add(buffer.consumeSorted())
                await(createPromise(this.state.delay, this.state.array, sortedSet, null, null, null))
            } else {
                await(createPromise(this.state.delay, diagram, sortedSet, null, null, null))
            }
        }
    }

    bufferAlgo() {
        let buffer = null
        switch(this.state.selectedAlgo) {
            case 'SELECTION SORT':
                buffer = selectionSort(this.state.array)
                break
            case 'BUBBLE SORT':
                buffer = bubbleSort(this.state.array)
                break
            case 'MERGE SORT':
                buffer = mergeSort(this.state.array)
                break
            case 'QUICK SORT':
                buffer = quickSort(this.state.array)
                break
            case 'GRAVITY SORT':
                buffer = gravitySort(this.state.array)
                break
            default:
        }
        this.setState({buffer:buffer})
    }

    start() {
        const createPromise = (delay, array, sorted, scanElement, pivotBefore, pivotAfter) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.setState({array:array, sorted:sorted, scanElement:scanElement, pivotBefore:pivotBefore, pivotAfter:pivotAfter})
                    resolve();
                }, delay)
            })
        }
        if (this.state.buffer === null) {
            this.bufferAlgo()
        }
        this.setState({isRunning:true}, ()=> {
            switch(this.state.selectedAlgo) {
                case 'SELECTION SORT':
                    this.playbackSelection(createPromise)
                    break
                case 'BUBBLE SORT':
                    this.playbackBubble(createPromise)
                    break
                case 'MERGE SORT':
                    this.playbackMerge(createPromise)
                    break
                case 'QUICK SORT':
                    this.playbackQuick(createPromise)
                    break
                case 'GRAVITY SORT':
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
        return (
            <div>
                <SortingMenuBar isRunning={this.state.isRunning} selectedAlgo={this.state.selectedAlgo} setAlgo={this.setAlgo} generateRandomArray={this.generateRandomArray} start={this.start} pause={this.pause}/>
                <SortChart array={this.state.array} sorted={this.state.sorted} scanElement={this.state.scanElement} pivotBefore={this.state.pivotBefore} pivotAfter={this.state.pivotAfter}/>
            </div>
        )
    }
}

export default Sorter