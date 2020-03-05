import React from 'react';
import { Icon } from 'semantic-ui-react';

const Hashtag = () => {

    const onDeleteTag =() => {

    }
    return (
        <>
          <div key={i} className="tagKey"><Icon name="tag" />{value}<div onClcik={(i) => onDeleteTag()} ><Icon name="cancel"  /></div></div>
        </>
    )
}

export default Hashtag;