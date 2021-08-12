import React from 'react'
import SortChart from './SortChart'
import SortingMenuBar from './SortingMenuBar'
import {selectionSort} from './SortingAlgorithms'

class Sorter extends React.Component {
    constructor() {
        super()
        this.state = {
            isRunning:false,
            selectedAlgo:'',
            array:[],
            sorted:new Set(),
            arraySize:50,
            scanElement:null
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
                await(createPromise(diagram, sortedSet, scan[i]))
            }
            sortedSet.add(buffer.consumeSorted())
            await(createPromise(diagram, sortedSet, null))
        }
    }

    start() {
        const createPromise = (array, sorted, scanElement) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.setState({array:array, sorted:sorted, scanElement:scanElement})
                    resolve();
                }, 10)
            })
        }
        switch(this.state.selectedAlgo) {
            case 'SELECTION':
                this.playbackSelection(createPromise)
                break
            case 'BUBBLE':
                break
            default:
        }
    }

    render() {
        return (
            <div>
                <SortingMenuBar setAlgo={this.setAlgo} generateRandomArray={this.generateRandomArray} start={this.start}/>
                <SortChart array={this.state.array} sorted={this.state.sorted} scanElement={this.state.scanElement}/>
            </div>
        )
    }
}

export default Sorter