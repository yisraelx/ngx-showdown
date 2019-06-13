Headers :
---------
H1
===
H2
---
### H3
#### H4

* * *

Code blocks :
-------------
*With `highlightjs` extension*

```ts
function sum(...nums: number[]): number {
  return nums.reduce((sum, num) => sum + num, 0);
}

let a: number = 1;
let b: number = 2;
let result: number = sum(a, b);

console.log(`${ a } + ${ b } = ${ result }`);
```

some `inline` block.

    some indent block

Quote blocks :
--------------
> Some quote
and more

>> Anther quote

> Some quote
> with **bold** and `block`
>> and Anther quote
>> >> #### and some more quote

* * *

Lists :
-------
* a
 - A
     - 3
- b
+ c

1. bob
  1. some
2. alice
  - other
      1. anther
3. moshe

Task List
---
- [x] Some
- [ ] Other

Emphasis :
----------
**bold**
*italic*
***bold and italic***
~~strikethrough~~
__underline__
**a *italic* in bold**
~~**strikethrough and bold**~~
__*underline and italic*__
__***underline and bold and italic***__

Links :
-------
[Showdown](http://showdownjs.com)
[Bottom](#bottom)
[Angular]

[Angular]: https://angular.io/

Emoji :
-------
:smile:
:+1:
:beer:

* * *

Tables :
--------
|   a   |   b   |   c   |
| ----- | :---: | ----: |
|  123  |  456  |  789  |
|  ABC  |  DEF  |  GHI  |

* * *

Horizontal Lines :
------------------

***

---

** ** ** ** **

--------------------

* * *

Sanitize :
----------
*Some malicious link*
<a href="javascript:alert('Hello!')">Click Me</a>

* * *

Extensions :
------------
*A 'lang' extension that replace \`Markdown\` to \`Showdown\`*
`` Markdown ``
`` `Markdown` ``
`` `markdown` ``
* * *

<h2>HTML</h2>
<hr />
<div>Some `&lt;div&gt;` tag</div>
<strong>and **\<strong>** tag</strong>
<br />
<footer align="center" id="bottom">
  <a href="#headers-">
    <strong>Top</strong>
    <i class="fas fa-chevron-up"></i>
  </a>
</footer>
