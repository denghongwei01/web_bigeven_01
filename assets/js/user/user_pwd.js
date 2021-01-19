$(function () {
    // 1.定义校验规则(3个)
    var form = layui.form;
    form.verify({
        // 1.1 所有密码
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 2.新密码
        samePwd: function (value) {
            // value是新密码，旧密码需要获取
            if (value == $('[name=oldPwd]').val()) {
                return "原密码和新密码不能相同！"
            }
        },
        // 3.两次新密码进行比较
        rePwd: function (value) {
            // value是再次输入的新密码，新密码需要重新获取
            if (value !== $('[name=newPwd]').val()) {
                return "两次密码输入不一致！"
            }
        },

    })

    // 2.表单提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('修改密码成功！')
                // 重置表单
                $('.layui-form')[0].reset();
            }
        })
    })
})