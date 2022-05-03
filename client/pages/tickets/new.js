const NewTicket = () => {
  return (
    <div>
      <h1>Create a new ticket</h1>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="title" />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="text" className="form-control" id="price" />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea className="form-control" id="description" rows="3"></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

NewTicket.getInitialProps = async (context, client, currentUser) => {
  return {}
}

export default NewTicket