import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DataService } from './data.service';


describe('DataService', () => {
  let service: DataService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DataService);
  });

  it('should Returns the list of homes', () => {
    // Spy on and mock the httpclient
    httpClient = TestBed.get(HttpClient);
    //use our
    const mockHomes = [
      {
        title: 'Home 1',
        image:
          'https://images.unsplash.com/photo-1549517045-bc93de075e53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&w=1000&q=80',
        location: ' New York',
      },
      {
        title: 'Home 2',
        image:
          'https://images.unsplash.com/photo-1549517045-bc93de075e53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&w=1000&q=80',
        location: ' Bostan',
      },
      {
        title: 'Home 3',
        image:
          'https://images.unsplash.com/photo-1549517045-bc93de075e53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&w=1000&q=80',
        location: 'Chicago',
      },
    ];
    //use our service to get homes
    spyOn(httpClient,'get').and.returnValue(of(mockHomes))
    const spy= jasmine.createSpy('spy');
    service.getHomes$().subscribe(spy);
    //Verify taht the service returned mocked data
    expect(spy).toHaveBeenCalledWith(mockHomes);

    //verify that the service called the proper HTTP endpoints

    expect(httpClient.get).toHaveBeenCalledWith('assets/home.json');


  });
});
