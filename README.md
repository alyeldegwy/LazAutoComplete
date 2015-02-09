# LazAutoComplete
JQuery plugin to convert Html Select to Auto Complete Field

## How To use
Include jQuery and the plugin on a page. Then select a select tag to active the auto complete and call the `lazAutoComplete` method.

```html
  <select  name="selectCity">
      <option value="">Select one...</option>
      <option value="ActionScript">ActionScript</option>
      <option value="AppleScript">AppleScript</option>
      <option value="Asp">Asp</option>
      <option value="BASIC">BASIC</option>
      <option value="C">C</option>
      <option value="C++">C++</option>
      <option value="Clojure">Clojure</option>
      <option value="COBOL">COBOL</option>
      <option value="ColdFusion">ColdFusion</option>
      <option value="Erlang">Erlang</option>
      <option value="Fortran">Fortran</option>
      <option value="Groovy">Groovy</option>
      <option value="Haskell">Haskell</option>
      <option value="Java">Java</option>
      <option value="JavaScript">JavaScript</option>
      <option value="Lisp">Lisp</option>
      <option value="Perl">Perl</option>
      <option value="PHP">PHP</option>
      <option value="Python">Python</option>
      <option value="Ruby">Ruby</option>
      <option value="Scala">Scala</option>
  </select>
```

Make sure to call tha function after the document ready is fired

```js
$(function(){
	$('select').lazAutoComplete({placeholder: 'Placeholder Text..'}, function (text, value) {
      window.console.log('Selected Text: ' + text);
      window.console.log('Selected Value' + value);
  });
});
```
