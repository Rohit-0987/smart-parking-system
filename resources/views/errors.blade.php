@if($errors->any())
    @foreach ($errors->all() as $error)
        <div class="alert alert-info" role="alert">
            {{$error}}
        </div>
    @endforeach
@endif