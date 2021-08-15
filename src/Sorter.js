import React from 'react'
import SortChart from './SortChart'
import SortingMenuBar from './SortingMenuBar'
import {bubbleSort, mergeSort, quickSort, selectionSort} from './SortingAlgorithms'

class Sorter extends React.Component {
    constructor() {
        super()
        this.state = {
            isRunning:false,
            selectedAlgo:'',
            array:[],
            sorted:new Set(),
            arraySize:50,
            scanElement:null,
            pivotBefore:null,
            pivotAfter:null,
            delay:50
        }
        this.setAlgo = this.setAlgo.bind(this)
        this.generateRandomArray = this.generateRandomArray.bind(this)
        this.start = this.start.bind(this)
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
        const buffer = selectionSort(this.state.array)
        const sortedSet = new Set()
        while (!buffer.isEmpty()) {
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
        const buffer = bubbleSort(this.state.array)
        const sortedSet = new Set()
        while (!buffer.isEmpty()) {
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
        const buffer = mergeSort(this.state.array)
        const sortedSet = new Set()
        let i = 0
        while (!buffer.isEmpty()) {
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
        const buffer = quickSort(this.state.array)
        const sortedSet = new Set()
        while (!buffer.isEmpty()) {
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

    start() {
        const createPromise = (delay, array, sorted, scanElement, pivotBefore, pivotAfter) => {
            console.log(pivotAfter)
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.setState({array:array, sorted:sorted, scanElement:scanElement, pivotBefore:pivotBefore, pivotAfter:pivotAfter})
                    resolve();
                }, delay)
            })
        }
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
            default:
        }
    }

    render() {
        return (
            <div>
                <SortingMenuBar setAlgo={this.setAlgo} generateRandomArray={this.generateRandomArray} start={this.start}/>
                <SortChart array={this.state.array} sorted={this.state.sorted} scanElement={this.state.scanElement} pivotBefore={this.state.pivotBefore} pivotAfter={this.state.pivotAfter}/>
            </div>
        )
    }
}

export default Sorter