import {createSlice} from '@reduxjs/toolkit';
import MaximumBipartiteMatching from './MaximumBipartiteMatching'

const mbm = new MaximumBipartiteMatching();

const MAX_NODE = 32;

const initialState = {
  leftNodes: [],
  rightNodes: [],
  selected: undefined,
  links: [],
  validLinks: [],
  removedValidLinks: [],
  newValidLinks: [],
  counter: 0,
  checkingNode: undefined,
  checkingResult: undefined,
  noNextStep: true,
  probability: 0.1
};

const addNode = (region, state) => {
  if (region === "left") {
    state.leftNodes.push(state.counter);
    state.counter++;
  } else if (region === "right") {
    state.rightNodes.push(state.counter);
    state.counter++;
  }
}

const addLink = (state, start, end) => {
  console.log(state.links.every(e => start !== e[0] || end !== e[1]), start, end);
  if (state.links.every(e => start !== e[0] || end !== e[1])) {
    state.links.push([start, end]);
    mbm.addLinks(start, end)
    state.validLinks = mbm.getValid();
    state.noNextStep = !mbm.hasNextStep();
  }
}

const addMaxNodes = (state) => {
  while (state.leftNodes.length < MAX_NODE) {
    state.leftNodes.push(state.counter);
    state.counter++;
  }
  while (state.rightNodes.length < MAX_NODE) {
    state.rightNodes.push(state.counter);
    state.counter++;
  }
}

const generateRandomLinks = (state,) => {
  state.selected = undefined;
  state.links = [];
  state.validLinks = [];
  state.removedValidLinks = [];
  state.newValidLink = [];
  state.checkingNode = undefined;
  state.checkingResult = undefined;
  state.noNextStep = true
  mbm.reset();


  for (const l of state.leftNodes) {
    for (const r of state.rightNodes) {
      if (Math.random() < state.probability) {
        console.log(l, r);
        addLink(state, l, r);
      }
    }
  }
}

export const matcherSlice = createSlice({
  name: 'matcher',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addLeftNode: (state) => {
      if (state.leftNodes.length < MAX_NODE) {
        addNode("left", state)
      }
    },
    addRightNode: (state) => {
      if (state.rightNodes.length < MAX_NODE) {
        addNode("right", state)
      }
    },
    selectNode: (state, action) => {
      if (state.leftNodes.includes(action.payload) || state.rightNodes.includes(action.payload)) {
        state.selected = action.payload;
      }
    },
    addLinks: (state, action) => {
      if (state.selected !== undefined) {
        if (state.leftNodes.includes(state.selected) && state.rightNodes.includes(action.payload)) {
          addLink(state, state.selected, action.payload);
        } else if (state.rightNodes.includes(state.selected) && state.leftNodes.includes(action.payload)) {
          addLink(state, action.payload, state.selected);
        }
      }
      state.selected = undefined;
    },
    nextCheck: (state) => {
      const [current, succeeded] = mbm.next();
      if (current === undefined) {
        state.noNextStep = true;
      }
      const nextValidLinks = mbm.getValid();
      state.removedValidLinks =
        state.validLinks.filter(e => nextValidLinks.every(e2 => e[0] !== e2[0] || e[1] !== e2[1]));
      state.newValidLinks =
        nextValidLinks.filter(e => state.validLinks.every(e2 => e[0] !== e2[0] || e[1] !== e2[1]));
      state.validLinks = nextValidLinks;
      state.checkingNode = current;
      state.checkingResult = succeeded;
    },
    reset: (state) => {
      state.selected = undefined;
      state.links = [];
      state.validLinks = [];
      state.removedValidLinks = [];
      state.newValidLinks = [];
      state.checkingNode = undefined;
      state.checkingResult = undefined;
      state.noNextStep = true;
      state.counter = 0;
      state.leftNodes = [];
      state.rightNodes = [];
      mbm.reset();
    },
    randomLinks: (state) => {
      generateRandomLinks(state);
    },
    maxNode: (state) => {
      addMaxNodes(state);
    },
    changeProbability: (state, action) => {
      console.log("hahah");
      state.probability = parseFloat(action.payload);
      if (isNaN(state.probability) || state.probability < 0 || state.probability > 1) {
        state.probability = 0.1;
      }
    }
  },
});

export const {addLeftNode, addRightNode, selectNode, addLinks, nextCheck, reset, randomLinks, maxNode, changeProbability} = matcherSlice.actions;

export const selectLeftNodes = (state) => state.matcher.leftNodes;
export const selectRightNodes = (state) => state.matcher.rightNodes;
export const selectSelectedNode = (state) => state.matcher.selected;
export const selectLinks = (state) => state.matcher.links;
export const selectValidLinks = (state) => state.matcher.validLinks;
export const selectNewValidLinks = (state) => state.matcher.newValidLinks;
export const selectRemovedValidLinks = (state) => state.matcher.removedValidLinks;
export const selectCheckingNode = (state) => state.matcher.checkingNode;
export const selectCheckingResult = (state) => state.matcher.checkingResult;
export const selectNoNextStep = (state) => state.matcher.noNextStep;

export default matcherSlice.reducer;
