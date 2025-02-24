import { useState, Fragment } from 'react'

import './Content.css'


export default function Content({ activeContent }) {

    return (
        <div className="content-row">
            <h2 className="content-headline">{ activeContent }</h2>
            <div className="content-container">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quasi sunt amet voluptate odit! Optio veniam earum sit facilis, corporis eos nihil suscipit quod fuga sed? Illum accusamus hic optio nemo dolorem quam dignissimos possimus? Neque ut minima ipsam ex beatae omnis quam itaque tempore expedita consequuntur laudantium hic sed magni porro culpa nisi, dolorum possimus velit vel! Atque, nemo consequuntur. Tempora vero sunt odit harum quae optio debitis?
                </p>
            </div>
        </div>
    )
}