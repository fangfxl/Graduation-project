import Mock from 'mockjs';

Mock.mock('/login',{
    'name':'@name',
    'age|10-20':'@age'
});

Mock.mock("/list",{
    'page|0-99':'@page',
    'name':'@name'
})