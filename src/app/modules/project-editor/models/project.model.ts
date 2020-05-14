export class Project {
    id: Number|null;
    title: String;
    creativeTitle: String;
    name: String;
    commonThreads: Array<object>;
    themes: Array<object>;
    finalProduct: Object;
}

// {
// 	"title": "project title",
// 	"creativeTitle": "creative Title",
// 	"name": "description",
// 	"commonThreads": 
// 		[
// 			{"name": "Hilo Conductor 1"},{"name": "Hilo Conductor 2"}
// 		],
// 	"themes": 
// 		[
// 			{"name": "Tema 1"},{"name": "Tema 2"}
// 		],
// 	"finalProduct":
// 		{
// 			"id":"1",
// 			"name":"Maqueta"
// 		}
//   }