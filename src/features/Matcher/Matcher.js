import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {decrement} from "../counter/counterSlice";
import {
  addLeftNode,
  addRightNode,
  selectLinks,
  selectLeftNodes,
  selectRightNodes,
  selectValidLinks,
  selectNewValidLinks,
  selectRemovedValidLinks,
  nextCheck, selectNoNextStep,
  reset,
  randomLinks,
  maxNode,
  changeProbability,
} from './matcherSlice';

import Node from '../Node/Node'
import Xarrow from "react-xarrows";
import styles from './Matcher.module.css';



export function Matcher() {
  const leftNodes = useSelector(selectLeftNodes);
  const rightNodes = useSelector(selectRightNodes);
  const links = useSelector(selectLinks);
  const validLinks = useSelector(selectValidLinks);
  const newValidList = useSelector(selectNewValidLinks);
  const removedValidList = useSelector(selectRemovedValidLinks);
  const noNextStep = useSelector(selectNoNextStep);
  const dispatch = useDispatch();

  return (
    <div style={{height: "100vh"}}>
      <div style={{display: "flex", justifyContent: "center", height: "8%", padding:'1%', flexWrap: 'wrap'}}>
        <button className={styles.button} onClick={() => dispatch(addLeftNode())}>Add Left</button>
        <button className={styles.button} onClick={() => dispatch(addRightNode())}>Add Right</button>
        <button className={styles.button} onClick={() => dispatch(maxNode())}>Max Nodes</button>
        {/*<button onClick={() => dispatch(addRightNode())}>Update</button>*/}
        <button className={styles.button} onClick={() => dispatch(nextCheck())} disabled={noNextStep}>Next</button>
        <button className={styles.button} onClick={() => dispatch(reset())}>Reset</button>
        <button className={styles.button} onClick={() => dispatch(randomLinks())}>Random</button>
        <input className={styles.input} readOnly={false} onChange={e => dispatch(changeProbability(e.target.value))}/>
      </div>
      <div style={{display: "flex", height: "80%",}}>
        <div style={{
          width: '50%',

          display: "flex",
          flexDirection: "column-reverse",
          flexWrap: "wrap",
          alignContent: "center",
          justifyContent: "center"
        }}>
          {leftNodes.map(id =>
            <Node key={id} id={id}/>
          )}
        </div>
        <div style={{
          width: '50%',
          display: "flex",
          flexDirection: "column-reverse",
          flexWrap: "wrap",
          alignContent: "center",
          justifyContent: "center"
        }}>
          {rightNodes.map(id =>
            <Node key={id} id={id}/>
          )}
        </div>
        {links.map(points =>
          <Xarrow
            start={`${points[0]}`}
            end={`${points[1]}`}
            path="smooth"
            curveness={0.3}
            showHead={false}
            lineColor={"#F2E5D5"}
            key={`${points[0]}_${points[1]}`}
            startAnchor="right"
            endAnchor="left"
          />
        )}
        {validLinks.map(points =>
          <Xarrow
            start={`${points[0]}`}
            end={`${points[1]}`}
            path="smooth"
            curveness={0.3}
            strokeWidth={5}
            showHead={false}
            lineColor={"#F25757"}
            key={`valid_${points[0]}_${points[1]}`}
            startAnchor="right"
            endAnchor="left"
            dashness={{strokeLen: 10, nonStrokeLen: 15, animation: 1}}
          />
        )}
        {newValidList.map(points =>
          <Xarrow
            start={`${points[0]}`}
            end={`${points[1]}`}
            path="smooth"
            curveness={0.3}
            strokeWidth={10}
            showHead={false}
            lineColor={"rgba(0,255,0,0.8)"}
            key={`valid_${points[0]}_${points[1]}`}
            startAnchor="right"
            endAnchor="left"
            // dashness={{strokeLen: 10, nonStrokeLen: 15, animation: 1}}
          />
        )}
        {removedValidList.map(points =>
          <Xarrow
            start={`${points[0]}`}
            end={`${points[1]}`}
            path="smooth"
            curveness={0.3}
            strokeWidth={10}
            showHead={false}
            lineColor={"rgba(255,0,0,0.8)"}
            key={`valid_${points[0]}_${points[1]}`}
            startAnchor="right"
            endAnchor="left"
            // dashness={{strokeLen: 10, nonStrokeLen: 15, animation: 1}}
          />
        )}
      </div>
    </div>
  );
}
