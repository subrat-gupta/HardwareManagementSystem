import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBucketComponent } from './my-bucket.component';

describe('MyBucketComponent', () => {
  let component: MyBucketComponent;
  let fixture: ComponentFixture<MyBucketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyBucketComponent]
    });
    fixture = TestBed.createComponent(MyBucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
