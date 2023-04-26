// ==UserScript==
// @name         google search result up down
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       https://github.com/kanipan
// @match        https://www.google.com/search?*
// @match        https://www.google.co.jp/search?*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let links_index = -1;
    let links = document.getElementsByClassName("g");
    let anchors = new Array();
    let target_anchor = null;
    const page_table = document.getElementsByTagName('table');
    const goooogle_anchors = page_table[page_table.length - 1].getElementsByTagName('a');

    // no search result
    if (links.length === 0) return;

    // push search result link to array
    [].forEach.call(links, function(elements){
        let search_result_anchor = elements.getElementsByTagName("a")[0];
        // except search result link that I don't expect
        if (search_result_anchor.href !== "" && search_result_anchor.ping !== ""){
            anchors.push(elements.getElementsByTagName("a")[0]);
        }
    });

    // push next and prev page link to array
    set_table_anchors(goooogle_anchors);
    const anchors_length = anchors.length;

    function moveResultLink(event){
        if (document.activeElement.type === "text") return;
        switch (event.keyCode){
            case 74: // j
                nextResultLink();
                break;
            case 75: // k
                prevResultLink();
                break;
            default:
                break;
        }
    }

    function nextResultLink(){
        if (links_index >= -1 && (links_index + 1) < anchors_length) {
            reset_focused_style(target_anchor);
            links_index++;
            target_anchor = anchors[links_index];
            set_focused_style(target_anchor);
        }
    }

    function prevResultLink(){
        if ((links_index) > 0 && links_index <= anchors_length) {
            reset_focused_style(target_anchor);
            links_index--;
            target_anchor = anchors[links_index];
            set_focused_style(target_anchor);
        }
    }

    function reset_focused_style(target_anchor){
        if (target_anchor !== null) {
            target_anchor.style.border = null;
        }
    }

    function set_focused_style(target_anchor){
        target_anchor.focus();
        target_anchor.style.border = 'solid';
    }

    function set_table_anchors(goooogle_anchors){
        // if exists prev page link
        if (goooogle_anchors[0].id === 'pnprev'){
            anchors.push(goooogle_anchors[0]);
        }
        // add next page link
        anchors.push(goooogle_anchors[goooogle_anchors.length - 1]);
    }

    document.onkeydown = function(event){ moveResultLink(event); };

})();
