import React from "react";

function deleteTag(tag)
{
  let url = "http://localhost:3001/deleteTag?name="+tag;
  fetch(url,{method:"DELETE"})
}

export default class FetchRandomUser extends React.Component {
  state = {
    loading: true,
    tags: []
  };

  async componentDidMount() {
    const url_tag = "http://localhost:3001/tagNames";

    const responseTag = await fetch(url_tag);
    const dataTag = await responseTag.json();

    const tagName = function(tag) {return tag.tag_name; }

    this.setState({ tags: dataTag, loading: false });
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.tags.length) {
      return <div>didn't get a person</div>;
    }

    return (
      <div>
        {this.state.tags.map(tag => (
          <div key={tag["tag_name"]}>
          <div>{tag["tag_name"]}</div>
          <div>
            <button type="button" onClick={()=>{deleteTag(tag["tag_name"])}}> delete </button></div> 
          </div>
        ))}
      </div>    
    );
  }
}