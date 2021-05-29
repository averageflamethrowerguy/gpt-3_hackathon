import React from 'react'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

const JSON_SPACES = 2;

let getDescendant = (obj, desc) => { // performs deep object field lookup, akin to obj[deep.paths.ftw]
  var arr = desc.split(".");
  while(arr.length && (obj = obj[arr.shift()])); // causes warning that can be ignored
  return obj;
}

let capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1) // upper-cases first letter of a string

const parseMixedText = (text) => { // parses text that includes normal text interspersed with LaTeX in block delimited by '$''
  let segments = []
  text.split('$').forEach((segment, index) =>  {
    if (index % 2 === 0) {
      if (segment) {
        segments.push(
          <span>{segment}</span>
        )
      }
    } else {
      segments.push(
        <span>
          <InlineMath math={segment} />
        </span>
      )
    }
  })
  return segments
}

export { getDescendant, parseMixedText, capitalize } // useful methods in here for global access. can just import { getDescendant, capitalize } from '../utils'
