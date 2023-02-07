import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { TodoService } from "./todo.service";

describe("todoService", () => {
  let todoService: TodoService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", [
      "get",
      "post",
      "delete",
    ]);
    todoService = new TodoService(httpClientSpy);
  });

  it("should return todo list", (done: DoneFn) => {
    const expecTodoList = [
      {
        id: 1,
        completedon: new Date(),
        iscompleted: false,
        description: "hello",
        userid: 5,
      },
    ];
    const id = 5;
    httpClientSpy.get.and.returnValue(of(expecTodoList));
    todoService.getTodoList(id).subscribe(
      (res) => {
        expect(res).toEqual(expecTodoList);
        done();
      },
      (err) => done.fail
    );
    expect(httpClientSpy.get.calls.count()).withContext("one call").toBe(1);
  });

  it("should add todo and return todo", (done: DoneFn) => {
    const expecttodo = {
        id: 1,
        completedon: new Date(),
        iscompleted: false,
        description: "hello",
        userid: 5,
      }
      const addtodo = {description:"hello",userid:5}
      httpClientSpy.post.and.returnValue(of(expecttodo))
      todoService.addTodoItem(addtodo).subscribe((res)=>{
        expect(res).toEqual(expecttodo);
        done();
      },
      (err) => done.fail
    );
  });
  it("should delete todo", (done: DoneFn) => {
    const id=1
    const out = 'removed'
    httpClientSpy.delete.and.returnValue(of(out))
    todoService.deleteTodoItem(id).subscribe((res)=>{
        expect(res).toEqual(out)
        done()
    },(err)=>{}
    )
  });
  it("should update todo translate state", (done: DoneFn) => {
    const expecttodo ={
        id: 1,
        completedon: new Date(),
        iscompleted: true,
        description: "hello",
        userid: 5,
    }
    const input = 1
    httpClientSpy.get.and.returnValue(of(expecttodo))
    todoService.translateChange(input).subscribe((res)=>{
        expect(res).toEqual(expecttodo)
        done()
    },(err)=>{})
  });
  it("should just translate todo and return translated todo", (done: DoneFn) => {
    const input = {
        q:'hello',
        target:'es'
    }
    const expectvalue ={
        translated: 'hola'
    }
    httpClientSpy.post.and.returnValue(of(expectvalue))
    todoService.translate(input).subscribe(res=>{
        expect(res).toEqual(expectvalue)
        done()
    })
  });
});
