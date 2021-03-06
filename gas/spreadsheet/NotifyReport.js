// レポートをお願いするscript
// 家族留学実施日に送信されるメールのため
// トリガーは21時-22時が望ましいと思います。
function notifyReport() {
  var MAM_COLUMN = {
    TIMESTAMP: 0,  // A1 記入日
    MANMA_member: 1,  // B1 担当
    FAMILY_NAME: 2,  // C1 お名前（家庭）
    FAMILY_EMAIL: 3,  // D1 ご連絡先（家庭）
    CAN_FAMILY_ABROAD: 4,  // E1 受け入れ可否
    STUDENT_NAME_1: 5,  // F1 参加学生名（1人目）
    STUDENT_EMAIL_1: 6,  // G1 参加学生の連絡先（1人目）
    STUDENT_NAME_2: 7,  // H1 参加学生名（2人目）
    STUDENT_EMAIL_2: 8,  // I1 参加学生の連絡先（2人目）
    STUDENT_NAME_3: 9,  // J1 参加学生名（3人目）
    STUDENT_EMAIL_3: 10,  // K1 参加学生の連絡先（3人目）
    FAMILY_CONSTRUCTION: 11,  // L1 受け入れ家庭の家族構成
    START_DATE: 12,  // M1 実施日時
    START_TIME: 13,  // N1 実施開始時間
    FINISH_TIME: 14,  // O1 実施終了時間
    MTG_PLACE: 15,  // P1 集合場所
    POSSIBLE_DATE: 16,  // Q1 受け入れ可能な日程
    NULL: 17,  // R1
    MAM_CHECK: 18,  // S1 manmaチェック欄 <- 不要になりました
    IS_EMAIL_SENT: 19,  // T1 sent欄 <- 不要になりました
    MAM_REPLY_CHECK: 20,  // U1 manma　返信確認
    IS_CONFIRM_EMAIL_SENT: 21,  // V1 実施sent欄
    CHECK_PAYMENT_1: 22,  // W1 振り込み確認(1人目)
    CHECK_PAYMENT_2: 23,  // X1 振り込み確認(2人目)
    CHECK_PAYMENT_3: 24,  // Y1 振り込み確認(3人目)
    SELF_INTRO_FAM: 25,  // Z1 プロフィール確認(家庭)
    SELF_INTRO_1: 26,  // AA1 プロフィール確認(1人目)
    SELF_INTRO_2: 27,  // AB1 プロフィール確認(2人目)
    SELF_INTRO_3: 28,  // AC1 プロフィール確認(3人目)
    THANK_YOU_MESE1: 29,  // AD1 お礼メール確認欄(1人目)
    THANK_YOU_MESE2: 30,  // AE1 お礼メール確認欄(1人目)
    THANK_YOU_MESE3: 31,  // AF1 お礼メール確認欄(3人目)
    REPORT_1: 32,  // AG1 レポート提出確認(1人目)
    REPORT_2: 33,  // AH1 レポート提出確認(2人目)
    REPORT_3: 34,  // AI1 レポート提出確認(3人目)
  }

  const mSheet = (function () {
    const sheet = SpreadsheetApp.getActive().getSheetByName("フォームの回答");
    const startRow = 2 // First row of data to process
    const lastRow = sheet.getLastRow() - 1
    const lastCol = sheet.getLastColumn()
    const dataRange = sheet.getRange(startRow, 1, lastRow, lastCol)
    return {
      values: function () {
        return dataRange.getValues()
      }
    }
  })()

  const mMail = (function() {
    return {
      subjectForParticipant: function() { return "【manma】ご家庭へのご連絡はお済みでしょうか" },
      bodyForParticipant: function(name) {
        if (name === '') { return '' }
        return name + "\n\n"
          + "お世話になっております、manmaです。\n\n"
          + "今回の家族留学はいかがでしたか?\n"
          + "ご参加いただき、大変ありがとうございました。\n\n"
          + "ぜひ、お写真と共に家族留学の様子や発見を\n"
          + "SNS等でもシェアしていただけたら幸いです。\n\n"
          + "１.【必須】 ご家庭へのお礼について\n\n"
          + "家族留学終了後は、受け入れてくださったご家族に、お礼と学びの報告メールをお送りいただきたく思います。\n"
          + "下記項目を踏まえて、実施日の翌日までに必ず、お送りいただきますようお願いいたします。\n\n"
          + "また、その際には【info.manma@gmail.com】をccにいれてください。\n\n"
          + "------------------お礼メールでお伝えいただきたいこと-----------------------\n"
          + "●ご家族のお話の中で印象的だったこと\n"
          + "●家族留学を通して気づいたことや学び\n"
          + "-------------------------------------------------------------------------\n\n"
          + "２.【必須】 アンケートへのご記入のお願い\n"
          + "下記のフォームより、ご記入くださいませ\n"
          + "5分ほどで記入が終わりますので、お早めのご回答をお願いいたします。\n"
          + "（回答期限は一週間以内となります。）\n"
          + "▷▷▷ https://docs.google.com/forms/d/e/1FAIpQLSciw15kjeHz3U-sCTRq30XSAa1REeXbhUhXa2kxXPGqmKbzfA/viewform \n"
          + "また、送信いただいた学び・感想に関しましてはこちらで編集して\n\n"
          + "manmaのSNS及びHPに掲載する可能性がございます。\n"
          + "掲載前に事前にお知らせのメールをお送りさせていただきます。\n\n"
          + "何卒よろしくお願いいたします。\n\n"
          + "皆様のご報告をお待ちしております！\n\n"
          + "manma"
      },
      subjectForFamily: function() { return "【manma】家族留学受け入れのお礼" },
      bodyForFamily: function(name) {
        return name + "様\n\n"
          + "お世話になっております、manma 家族留学事務局です。\n"
          + "今回は留学生を受け入れてくださり、本当にありがとうございました！\n\n"
          + "家族留学はいかがでしたでしょうか。\n"
          + "ご家庭のみなさまにとっても、楽しい時間となっておりましたら嬉しく思います。\n\n"
          + "これまでに家族留学に参加していただいた学生のみなさまからは、\n\n"
          + "・子どもがかわいくて、早く子育てをしてみたいと思った！\n"
          + "・1番家族留学に参加してよかったことは、お母さんとお話しできたこと。\n"
          + "仕事や家庭、教育についてどのようなことを考えながら日々過ごしているのかを知るきっかけになってよかったです。\n"
          + "・自分が当たり前だと思っていた家族像だけじゃない新しいかたちの家族を見れた！\n\n"
          + "など、上記のような感想をいただいております。\n\n"
          + "今回の家族留学を通じて、参加者にとって将来につながる変化や気づきがあったことと思います。\n"
          + "学生さんにも、お礼メールを送付していただくようお願いはしておりますが\n\n"
          + "今後も家族留学参加後にメールやSNS等で連絡のやり取りをしていただき\n"
          + "つながりを深めていただけたら嬉しく思います。\n\n"
          + "また、受け入れ家庭の皆さまには、家族留学後に簡単なアンケートへのご協力をお願いしております。\n"
          + "翌日までにご回答いただけますと幸いです。\n"
          + "▷▷▷ https://docs.google.com/forms/d/e/1FAIpQLScDKSkR-A5T2FR9O6t19zMMoUES2RkfYlNwOt3e7UCT6DELtw/viewform \n"
          + "学生にとって、貴重な機会をご提供くださり、本当にありがとうございました！\n\n"
          + "引き続き、家族留学およびmanmaをよろしくお願いいたします。\n\n"
          + "manma"
      },
      send: function(email, subject, body) {
        if (email === '' || body === ''){ return }
        Logger.log(email + "に送信"); Logger.log(subject); Logger.log(body)
        // GmailApp.sendEmail(email, subject, body, {name: 'manma'})
      }
    }
  })()

  const mDate = (function () {
    return {
      today: function () {
        return Utilities.formatDate(new Date(), 'JST', 'yyyy/MM/dd')
      },
      todayOfDateType: function () {
        // 今日の日付のDate型を取得する
        return new Date(Date.parse(Utilities.formatDate(new Date(), 'JST', 'yyyy/MM/dd')))
      },
      before: function (targetDate, beforeDays) {
        // targetDateの日付からbeforeDays日前を取得する
        return Utilities.formatDate((new Date((targetDate.getTime()) - (60 * 60 * 24 * 1000) * beforeDays)), 'JST', 'yyyy/MM/dd')
      },
      after: function (targetDate, afterDays, isFormatted) {
        if (isFormatted !== false) {
          return Utilities.formatDate((new Date((targetDate.getTime()) + (60 * 60 * 24 * 1000) * afterDays)), 'JST', 'yyyy/MM/dd')
        } else {
          return new Date((targetDate.getTime()) + (60 * 60 * 24 * 1000) * afterDays)
        }
      },
    }
  })()

  const data = mSheet.values()
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];

    // 返信確認ステータスが空 = 家族留学が実施されていない ので送信しない
    var mail_status = row[MAM_COLUMN.IS_CONFIRM_EMAIL_SENT]
    if (mail_status === "") {
      continue
    }

    var student_name = row[MAM_COLUMN.STUDENT_NAME_1] + "さま";
    var student_mail = row[MAM_COLUMN.STUDENT_EMAIL_1];
    if (row[MAM_COLUMN.STUDENT_NAME_2] != "") {
      student_name = student_name + "," + row[MAM_COLUMN.STUDENT_NAME_2] + "さま";
      student_mail = student_mail + "," + row[MAM_COLUMN.STUDENT_EMAIL_2];
    }
    if (row[MAM_COLUMN.STUDENT_NAME_3] != "") {
      student_name = student_name + "," + row[MAM_COLUMN.STUDENT_NAME_3] + "さま";
      student_mail = student_mail + "," + row[MAM_COLUMN.STUDENT_EMAIL_3];
    }

    var family_name = row[MAM_COLUMN.FAMILY_NAME];
    var family_mail = row[MAM_COLUMN.FAMILY_EMAIL];
    var family_abroad_date = new Date(row[MAM_COLUMN.START_DATE]);
    var f_family_abroad_date = Utilities.formatDate(family_abroad_date, 'JST', 'yyyy/MM/dd')

    // 家族留学実施日なら送信
    if (f_family_abroad_date == mDate.today()) {
      mMail.send(student_mail, mMail.subjectForParticipant(), mMail.bodyForParticipant(student_name))
      mMail.send(family_mail, mMail.subjectForFamily(), mMail.bodyForFamily(family_name))
    }
  }
}