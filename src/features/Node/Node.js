import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
  selectNode,
  selectSelectedNode,
  addLinks, selectCheckingNode, selectCheckingResult,
} from "../Matcher/matcherSlice";

export default function Node(props) {
  let circleStyle = {
    padding: '5px',
    margin: '5px',
    display: "inline-flex",
    borderRadius: "50%",
    height: '60px',
    width: '60px',
    color: "#f6f4eb",
    backgroundColor: "#A69D81",
    justifyContent: 'center',
    alignItems: 'center',
  };
  const dispatch = useDispatch();
  const selectedNode = useSelector(selectSelectedNode);
  const checkingNode = useSelector(selectCheckingNode);
  const checkingResult = useSelector(selectCheckingResult);
  if (selectedNode === props.id) {
    circleStyle.backgroundColor = "#d4cda6"
  } else if (checkingNode === props.id && checkingResult) {
    circleStyle.backgroundColor = '#77c865'
  } else if  (checkingNode === props.id && !checkingResult) {
    circleStyle.backgroundColor = '#c86584'
  }
  return (
    <div
      id={props.id}
      style={circleStyle}
      onClick={() => {
        if (selectedNode === undefined) {
          dispatch(selectNode(props.id))
        } else {
          dispatch(addLinks(props.id))
        }
      }}
    >
      <span>{props.id}</span></div>
  )
}
