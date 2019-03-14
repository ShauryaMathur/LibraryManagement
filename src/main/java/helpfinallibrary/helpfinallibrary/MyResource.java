package helpfinallibrary.helpfinallibrary;

import java.io.IOException;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import hibernateexamplecrud.Book;
import hibernateexamplecrud.BookException;
import hibernateexamplecrud.Book_lent;
import hibernateexamplecrud.CRUDops;

/**
 * Root resource (exposed at "myresource" path)
 */
@Path("myresource")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MyResource {

    /**
     * Method handling HTTP GET requests. The returned object will be sent
     * to the client as "text/plain" media type.
     *
     * @return String that will be returned as a text/plain response.
     */
    @GET
    //@Produces(MediaType.APPLICATION_JSON)
    public List<Book> getAll() {
    	List<Book> booklist=CRUDops.ShowAllBooks();
        return booklist;
    }
    
    @GET
    @Path("/history")
    //@Produces(MediaType.APPLICATION_JSON)
    public List<Book_lent> showHistory() {
    	List<Book_lent> transaction=CRUDops.ShowAllTransactions();
    	return transaction;
    }
    
    @POST
    @Path("/create")
    //@Consumes(MediaType.APPLICATION_JSON)
    public Response addBook(Book b) {
    	CRUDops.AddBook(Integer.toString(b.getId()),b.getTitle(), b.getAuthor(),Float.toString(b.getPrice()),Integer.toString(b.getQuantity()));
    	return Response.ok().build();
    }
    
    @POST
    @Path("/issue/{id}/{custid}")
    //@Consumes(MediaType.APPLICATION_JSON)
    public Response issueBook(@PathParam("id") int bookid,@PathParam("custid") int custid) {
    	try {
			CRUDops.lendbook(bookid, custid);
		} catch (IOException | BookException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
    	return Response.ok().build(); 
    }
    
    @POST
    @Path("/return/{bid}/{cid}")
    //@Produces(MediaType.APPLICATION_JSON)
    public Response ReturnmyBook(@PathParam("bid")int bookid,@PathParam("cid") int custid) {
    	try {
			CRUDops.returnbook(bookid, custid);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return Response.status(Response.Status.BAD_REQUEST).build();
		} catch (BookException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
    	return Response.ok().build();
    }
    
    @PUT
    @Path("/update/{id}/{title}/{author}/{price}/{quantity}")
    //@Produces(MediaType.APPLICATION_JSON)
    public Response updatemyBook(@PathParam("id")int id,@PathParam("title")String title,@PathParam("author")String author,@PathParam("price")float price,@PathParam("quantity")int quantity) {
    	CRUDops.UpdateBook(Integer.toString(id), title, author,Float.toString(price), Integer.toString(quantity));
    	return Response.ok().build();
    }
    
    @GET
    //@Produces(MediaType.APPLICATION_JSON)
    @Path("/search/{id}")
    //@Consumes(MediaType.APPLICATION_JSON)
    public Book getIt(@PathParam("id") int bookid) {
    	return CRUDops.Findbyid(bookid);
    }
    
    @DELETE
    @Path("/delete/{id}")
    //@Consumes(MediaType.APPLICATION_JSON)
    public Response deleteBook(@PathParam("id") int bookid) {
    	Book b=CRUDops.deletebook(bookid);
    	if(b==null)
    		return Response.status(Response.Status.BAD_REQUEST).build();
    	else
    		return Response.ok().build();
    }
}
