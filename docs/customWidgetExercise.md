The
[Widget Documentation](http://uw-madison-doit.github.io/uw-frame/widgets.html)
has more information about configuration options and more technical details.

Choose `Custom Widget` from the starter templates.

![Image of the template dropdown](img/selectorDropDown.png)

Let’s create a campus food account balance widget.

Select `Custom` from the drop down starter template selector

Type into title
```
Food Account Balance
```

Type as a description
```
Check your balance and get some money saving tips
```

Custom widgets are custom because you supply your own html markup.  Angular is
available to use.  Use this as an example.

```html
<div class='widget-body'>
  <div ng-if="content && content.data && content.data.food"  class='center'
    style='padding:20px; font-size: 35px; '>
    <i class="fa fa-credit-card-alt" style="color: #cbcbcb;"></i>
    <span style='color:#b70101; padding-left:10px;'>
      {{content.data.food.balance | currency:"$":2}}</span>
  </div>
  <div class='col-xs-6 v-center' style="text-align:center">
    <circle-button data-href='https://en.wikipedia.org/wiki/Bank'
      data-target='_blank' data-fa-icon='fa fa-dollar' data-title='Deposit money'>
    </circle-button>
  </div>
  <div class='col-xs-6 v-center' style="text-align:center">
    <circle-button data-href='https://en.wikipedia.org/wiki/Lost_and_found'
      data-target='_blank' data-fa-icon='fa fa-exclamation-triangle' data-title='Report lost card'>
    </circle-button>
  </div>
</div>
<a class='btn btn-default launch-app-button' target='_blank'
  href='https://twitter.com/campusfood'>Manage my food account
</a>
```

In widget URL JSON sample type this

```json
{"status":200,"data":{"food": {"balance":25.73}}}
```

Click update and see your widget in action.

Change the styling and the JSON to try different things.
